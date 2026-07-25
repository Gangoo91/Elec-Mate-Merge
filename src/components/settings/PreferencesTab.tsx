import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { useDashboardPreferences } from '@/hooks/useDashboardPreferences';
import { useUiPreferences } from '@/hooks/useUiPreferences';
import { toast } from 'sonner';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { ToggleRow, SelectRow, SettingsCard } from './rows';

// Values must match the certificate ids used by NewCertificate / inspection routing.
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

  // Certificate preferences — persisted per-user in user_settings
  const { preferences: uiPrefs, setPreference: setUiPreference } = useUiPreferences();

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
          <div className="px-5 sm:px-6 py-3 text-[12.5px] text-white leading-relaxed">
            Show or hide hubs on your home screen.
          </div>
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
    </motion.div>
  );
};

export default PreferencesTab;
