import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
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
import { cn } from '@/lib/utils';
import {
  TextAction,
  Dot,
  Eyebrow,
  containerVariants,
  itemVariants,
} from '@/components/college/primitives';
import { ToggleRow, SelectRow, SettingsCard } from './rows';

/* Category labels — the toggle set is derived from the preferences hook (single
   source of truth); this only maps a key to a friendly label. Compliance types
   (compliance_insurance / _scheme / _calibration / _ecs_card) are written under
   the certificates_compliance category, so "Certificates & Compliance" controls
   them. */
const CATEGORY_LABELS: Record<string, string> = {
  daily_briefing: 'Daily briefing',
  tasks_projects: 'Tasks & projects',
  invoices_quotes: 'Invoices & quotes',
  certificates_compliance: 'Certificates & compliance',
  study_centre: 'Study centre',
  mental_health: 'Mental health',
  apprentice: 'Apprentice',
  messages: 'Messages',
};

const humanise = (k: string) =>
  k.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

const fmtHour = (h: number) => `${String(h).padStart(2, '0')}:00`;

const timeAgo = (iso: string): string => {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return d === 1 ? 'yesterday' : `${d}d ago`;
};

interface DeviceRow {
  device_type: string | null;
  browser: string | null;
}
interface RecentNotif {
  id: string;
  title: string | null;
  message: string | null;
  created_at: string;
  is_read: boolean;
  link: string | null;
}

const NotificationsTab = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [isTestingSend, setIsTestingSend] = useState(false);

  const {
    isSupported: isPushSupported,
    permission,
    isSubscribed: isPushSubscribed,
    isLoading: isPushLoading,
    subscribe: subscribeToPush,
    unsubscribe: unsubscribeFromPush,
  } = usePushNotifications();

  const {
    preferences: notifPrefs,
    updatePreference,
    isLoading: isPrefsLoading,
  } = useNotificationPreferences();
  const { quietHours, updateQuietHours } = useQuietHours();
  const [allMuted, setAllMuted] = useState(false);

  const [devices, setDevices] = useState<DeviceRow[]>([]);
  const [recent, setRecent] = useState<RecentNotif[]>([]);

  const platform = useMemo(() => Capacitor.getPlatform(), []);

  // Load this user's active push devices + recent bell activity.
  const loadLive = useCallback(async () => {
    if (!user?.id) return;
    const [devRes, notifRes] = await Promise.all([
      supabase
        .from('push_subscriptions')
        .select('device_type, browser')
        .eq('user_id', user.id)
        .eq('is_active', true),
      supabase
        .from('user_notifications')
        .select('id, title, message, created_at, is_read, link')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5),
    ]);
    if (!devRes.error && devRes.data) setDevices(devRes.data as DeviceRow[]);
    if (!notifRes.error && notifRes.data) setRecent(notifRes.data as RecentNotif[]);
  }, [user?.id]);

  useEffect(() => {
    loadLive();
  }, [loadLive]);

  const categoryKeys = Object.keys(notifPrefs) as NotificationCategory[];
  const activeCount = categoryKeys.filter((k) => notifPrefs[k]).length;
  const totalCount = categoryKeys.length;

  // ── Delivery status ──────────────────────────────────────────────────
  const permissionLabel =
    permission === 'granted'
      ? 'Allowed'
      : permission === 'denied'
        ? 'Blocked in settings'
        : 'Not enabled';
  const permissionTone: 'green' | 'red' | 'amber' =
    permission === 'granted' ? 'green' : permission === 'denied' ? 'red' : 'amber';

  const deviceCount = devices.length;
  const deviceSummary =
    deviceCount === 0
      ? 'No devices registered'
      : `${deviceCount} device${deviceCount === 1 ? '' : 's'} registered`;

  const channelLine =
    platform === 'ios'
      ? 'iOS push is live via Apple (APNS).'
      : platform === 'android'
        ? 'Android push is live via Firebase (FCM).'
        : 'Web push is live in this browser.';

  // ── Quiet hours live preview ─────────────────────────────────────────
  const quietPreview = useMemo(() => {
    if (!quietHours.enabled) return null;
    const ch = new Date().getHours();
    const { startHour, endHour } = quietHours;
    const spansMidnight = startHour > endHour;
    const inQuiet = spansMidnight
      ? ch >= startHour || ch < endHour
      : ch >= startHour && ch < endHour;
    if (inQuiet) {
      const sameDay = ch < endHour;
      return `Alerts held until ${fmtHour(endHour)}${sameDay ? ' today' : ' tomorrow'} — delivered with your morning briefing.`;
    }
    return `Alerts pause at ${fmtHour(startHour)}, then resume at ${fmtHour(endHour)}.`;
  }, [quietHours]);

  // ── Actions ──────────────────────────────────────────────────────────
  const handleTestNotification = async () => {
    if (!user?.id) return;
    if (permission === 'denied') {
      addNotification({
        title: 'Notifications blocked',
        message: 'Allow notifications for Elec-Mate in your browser or device settings, then try again.',
        type: 'error',
      });
      return;
    }
    if (!isPushSubscribed || deviceCount === 0) {
      addNotification({
        title: 'No device registered',
        message: 'Turn on push notifications above first, then send a test.',
        type: 'info',
      });
      return;
    }
    setIsTestingSend(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-push-notification', {
        body: {
          userId: user.id,
          title: 'Test notification',
          body: 'Your Elec-Mate notifications are working.',
          type: 'default',
          data: { route: '/settings' },
          skipQuietHours: true,
        },
      });
      if (error) {
        addNotification({ title: 'Test failed', message: error.message || 'Could not send.', type: 'error' });
      } else if (data?.sent > 0) {
        addNotification({ title: 'Test sent', message: `Delivered to ${data.sent} device${data.sent === 1 ? '' : 's'}.`, type: 'success' });
      } else if (data?.errors?.length > 0) {
        addNotification({ title: 'Send failed', message: data.errors[0]?.error || 'Delivery failed.', type: 'error' });
      } else {
        addNotification({ title: 'No active device', message: 'Toggle push off and on again to re-register this device.', type: 'info' });
      }
    } catch {
      addNotification({ title: 'Test failed', message: 'Something went wrong sending the test.', type: 'error' });
    } finally {
      setIsTestingSend(false);
    }
  };

  const handlePushToggle = async () => {
    try {
      if (isPushSubscribed) {
        const ok = await unsubscribeFromPush();
        if (ok) addNotification({ title: 'Push turned off', message: "You won't get alerts when the app is closed.", type: 'info' });
      } else {
        const ok = await subscribeToPush();
        if (ok) addNotification({ title: 'Push turned on', message: "You'll get alerts even when the app is closed.", type: 'success' });
      }
      loadLive();
    } catch (err) {
      console.error('[Push Toggle] Error:', err);
      addNotification({ title: 'Error', message: 'Could not update push settings.', type: 'error' });
    }
  };

  const handleMuteAll = () => {
    const next = !allMuted;
    setAllMuted(next);
    for (const key of categoryKeys) updatePreference(key, !next);
    addNotification({
      title: next ? 'All notifications muted' : 'Notifications unmuted',
      message: next ? 'Every category has been paused.' : 'Every category is back on.',
      type: 'info',
    });
  };

  const muteTone: 'red' | 'green' | 'amber' = allMuted
    ? 'red'
    : activeCount === totalCount
      ? 'green'
      : 'amber';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
    >
      {/* ── 01 PUSH DELIVERY ── */}
      <motion.section variants={itemVariants} className="h-full">
        <SettingsCard eyebrow="01" title="Push delivery">
          {isPushSupported ? (
            <>
              <ToggleRow
                label="Push notifications"
                subtitle={
                  isPushSubscribed
                    ? 'On — alerts arrive when the app is closed'
                    : 'Off — turn on to get alerts anywhere'
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

              {/* Live status well */}
              <div className="px-5 sm:px-6 py-4 space-y-2.5">
                <div className="flex items-center gap-2">
                  <Dot tone={permissionTone} />
                  <span className="text-[12.5px] text-white/80">
                    Permission: <span className="text-white">{permissionLabel}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Dot tone={deviceCount > 0 ? 'green' : 'amber'} />
                  <span className="text-[12.5px] text-white/80">{deviceSummary}</span>
                </div>
                <p className="text-[11.5px] text-white/55 leading-relaxed pl-4">
                  {channelLine} iOS, Android and web are all live.
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-3">
                <span className="text-[12.5px] text-white/65">Send a test to this device</span>
                <TextAction onClick={handleTestNotification}>
                  {isTestingSend ? 'Sending…' : 'Send test'}
                </TextAction>
              </div>
            </>
          ) : (
            <div className="px-5 sm:px-6 py-6 text-[12.5px] text-white/60 leading-relaxed">
              Push notifications aren’t supported in this browser. Install the Elec-Mate app or
              add it to your home screen to receive alerts.
            </div>
          )}
        </SettingsCard>
      </motion.section>

      {/* ── 02 CATEGORIES ── */}
      <motion.section variants={itemVariants} className="h-full">
        <SettingsCard
          eyebrow="02"
          title="Categories"
          action={
            <TextAction onClick={handleMuteAll}>{allMuted ? 'Unmute all' : 'Mute all'}</TextAction>
          }
        >
          <div className="flex items-center gap-2 px-5 sm:px-6 py-3">
            <Dot tone={muteTone} />
            <span className="text-[13px] font-medium text-white">
              {allMuted ? 'All muted' : `${activeCount} of ${totalCount} on`}
            </span>
          </div>
          <div className={cn('divide-y divide-white/[0.06]', allMuted || isPrefsLoading ? 'opacity-40' : '')}>
            {categoryKeys.map((key) => (
              <ToggleRow
                key={key}
                label={CATEGORY_LABELS[key] ?? humanise(key)}
                checked={notifPrefs[key]}
                onCheckedChange={(v) => updatePreference(key, v)}
                disabled={allMuted || isPrefsLoading}
              />
            ))}
          </div>
        </SettingsCard>
      </motion.section>

      {/* ── 03 RECENT ACTIVITY ── */}
      <motion.section variants={itemVariants} className="h-full">
        <SettingsCard
          eyebrow="03"
          title="Recent activity"
          action={<TextAction onClick={() => navigate('/notifications')}>View all</TextAction>}
        >
          {recent.length === 0 ? (
            <div className="px-5 sm:px-6 py-6 text-[12.5px] text-white/55">
              No notifications yet. New alerts will appear here.
            </div>
          ) : (
            <div className="divide-y divide-white/[0.06]">
              {recent.map((n) => (
                <button
                  key={n.id}
                  onClick={() => n.link && navigate(n.link)}
                  disabled={!n.link}
                  className={cn(
                    'w-full text-left flex items-start gap-3 px-5 sm:px-6 py-3.5 transition-colors touch-manipulation',
                    n.link ? 'hover:bg-white/[0.03] cursor-pointer' : 'cursor-default'
                  )}
                >
                  <span
                    className={cn(
                      'mt-1.5 h-1.5 w-1.5 rounded-full shrink-0',
                      n.is_read ? 'bg-white/20' : 'bg-elec-yellow'
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <span className={cn('text-[13.5px] truncate', n.is_read ? 'text-white/75' : 'text-white font-medium')}>
                        {n.title || 'Notification'}
                      </span>
                      <span className="text-[11px] text-white/40 shrink-0">{timeAgo(n.created_at)}</span>
                    </div>
                    {n.message && (
                      <p className="mt-0.5 text-[12px] text-white/55 line-clamp-2">{n.message}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </SettingsCard>
      </motion.section>

      {/* ── 04 QUIET HOURS ── */}
      <motion.section variants={itemVariants} className="h-full">
        <SettingsCard eyebrow="04" title="Quiet hours">
          <ToggleRow
            label="Quiet hours"
            subtitle="Hold alerts overnight"
            checked={quietHours.enabled}
            onCheckedChange={(v) => updateQuietHours({ enabled: v })}
          />
          {quietHours.enabled && (
            <>
              <SelectRow
                label="From"
                value={String(quietHours.startHour)}
                onValueChange={(v) => updateQuietHours({ startHour: parseInt(v) })}
                options={[17, 18, 19, 20, 21, 22, 23, 0].map((h) => ({ value: String(h), label: fmtHour(h) }))}
              />
              <SelectRow
                label="Until"
                value={String(quietHours.endHour)}
                onValueChange={(v) => updateQuietHours({ endHour: parseInt(v) })}
                options={[4, 5, 6, 7, 8, 9, 10, 11].map((h) => ({ value: String(h), label: fmtHour(h) }))}
              />
              {quietPreview && (
                <div className="mx-5 sm:mx-6 my-4 rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3">
                  <Eyebrow>Next delivery</Eyebrow>
                  <p className="mt-1 text-[12.5px] text-white/80 leading-relaxed">{quietPreview}</p>
                </div>
              )}
            </>
          )}
        </SettingsCard>
      </motion.section>
    </motion.div>
  );
};

export default NotificationsTab;
