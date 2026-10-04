import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDashboardPreferences } from '@/hooks/useDashboardPreferences';
import { useUiPreferences } from '@/hooks/useUiPreferences';
import { toast } from 'sonner';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { ToggleRow, SelectRow, SettingsCard } from './rows';
import { hapticsEnabled, setHapticsEnabled } from '@/lib/haptics';
import { useHaptic } from '@/hooks/useHaptic';
import { useLoggingReminders } from '@/hooks/useLoggingReminders';

// Values must match the certificate ids used by inspection routing (certificateNewHref) — the default leads the Inspection & Testing "Start a cert" row.
const CERTIFICATE_TYPES = [
  { value: 'eicr', label: 'EICR' },
  { value: 'eic', label: 'EIC' },
  { value: 'minor-works', label: 'Minor Works' },
  { value: 'fire-alarm', label: 'Fire Alarm' },
  { value: 'emergency-lighting', label: 'Emergency Lighting' },
  { value: 'ev-charging', label: 'EV Charging' },
  { value: 'solar-pv', label: 'Solar PV' },
  { value: 'pat-testing', label: 'PAT Testing' },
];

const PreferencesTab = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();

  // Dashboard hubs
  const { isHubVisible, toggleHub } = useDashboardPreferences();
  const userRole = profile?.role || '';

  const dashboardHubs = [
    { id: 'apprentice', label: 'Apprentice Hub', locked: false },
    { id: 'electrical', label: 'Electrical Hub', locked: true },
    { id: 'study-centre', label: 'Study Centre', locked: false },
    ...(userRole === 'admin' || userRole === 'college'
      ? [{ id: 'college', label: 'College Hub', locked: false }]
      : []),
    { id: 'wellbeing', label: 'Wellbeing Hub', locked: false },
    // ELE-1670 — `EditorialHubGrid` has always filtered this card through
    // `isHubVisible('refer-a-mate')`, but it was never listed here, so there was
    // no switch anywhere in the app to turn it off. Users asking "how do I hide
    // the refer-a-mate tile?" were right: they couldn't.
    { id: 'refer-a-mate', label: 'Bring a Mate', locked: false },
  ];

  // Certificate preferences — persisted per-user in user_settings
  const { preferences: uiPrefs, setPreference: setUiPreference } = useUiPreferences();

  // Vibration — per device, read by every haptic in the app (ELE-1805).
  const [vibration, setVibration] = useState(hapticsEnabled);

  // ELE-1804 — the "log your hours / keep your streak" nagging is an apprentice
  // thing; electricians never see it, so the switch would do nothing for them.
  const { hidden: remindersHidden, setHidden: setRemindersHidden } = useLoggingReminders();
  const showReminderSwitch = userRole === 'apprentice' || !!profile?.admin_role;
  const haptic = useHaptic();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
    >
      {/* ── DASHBOARD HUBS ── */}
      <motion.section variants={itemVariants} className="h-full">
        <SettingsCard eyebrow="01" title="Dashboard">
          {/* ELE-1804 — the full layout (order, diary, shortcuts, figures) is
              edited over the home screen itself; these switches are just the
              hub cards. */}
          <button
            type="button"
            onClick={() => navigate('/dashboard?customise=1')}
            className="flex w-full min-h-[56px] items-center justify-between gap-3 px-5 sm:px-6 py-3 text-left touch-manipulation"
          >
            <span>
              <span className="block text-[14px] font-semibold text-white">Customise home screen</span>
              <span className="block text-[12.5px] text-white leading-relaxed">
                Order, diary, shortcuts and figures
              </span>
            </span>
            <span className="text-[13px] font-semibold text-elec-yellow">Open →</span>
          </button>
          <div className="px-5 sm:px-6 pb-2 pt-1 text-[12.5px] text-white leading-relaxed">
            Hub cards on your home screen
          </div>
          {dashboardHubs.map((hub) => (
            <ToggleRow
              key={hub.id}
              label={hub.label}
              subtitle={hub.locked ? 'Always visible' : undefined}
              checked={hub.locked || isHubVisible(hub.id)}
              onCheckedChange={(v) => {
                toggleHub({ hubId: hub.id, visible: v });
                toast(v ? `${hub.label} added to dashboard` : `${hub.label} hidden from dashboard`);
              }}
              disabled={hub.locked}
            />
          ))}
        </SettingsCard>
      </motion.section>

      {/* ── CERTIFICATES ── */}
      <motion.section variants={itemVariants} className="h-full">
        <SettingsCard eyebrow="02" title="Certificates">
          <SelectRow
            label="Default Type"
            value={uiPrefs.default_cert_type}
            onValueChange={(v) => setUiPreference({ key: 'default_cert_type', value: v })}
            options={CERTIFICATE_TYPES}
          />
          <ToggleRow
            label="Auto-Save Drafts"
            subtitle="Saves your certificate work every 30 seconds"
            checked={uiPrefs.autosave_drafts}
            onCheckedChange={(v) => setUiPreference({ key: 'autosave_drafts', value: v })}
          />
        </SettingsCard>
      </motion.section>

      {/* ── THIS DEVICE ── */}
      <motion.section variants={itemVariants} className="h-full">
        <SettingsCard eyebrow="03" title="This device">
          <ToggleRow
            label="Vibration"
            subtitle="Buzzes when you tap, save or get something wrong. Turn off to stop all vibration on this phone."
            checked={vibration}
            onCheckedChange={(v) => {
              setHapticsEnabled(v);
              setVibration(v);
              // One buzz on the way back on, so you can feel it is working.
              if (v) haptic.light();
              toast(v ? 'Vibration on' : 'Vibration off');
            }}
          />
        </SettingsCard>

        {showReminderSwitch && (
          <SettingsCard eyebrow="04" title="Reminders">
            <ToggleRow
              label="Hide logging reminders"
              subtitle="Stops the nudges to log hours, add evidence and keep streaks — banners, pace warnings, the weekly recap and reminder notifications. Your Log hours and Add evidence buttons stay, and so do messages from your tutor."
              checked={remindersHidden}
              onCheckedChange={(v) => {
                setRemindersHidden(v)
                  .then(() => toast(v ? 'Logging reminders hidden' : 'Logging reminders back on'))
                  .catch(() => toast.error("Couldn't save that — try again"));
              }}
            />
          </SettingsCard>
        )}
      </motion.section>
    </motion.div>
  );
};

export default PreferencesTab;
