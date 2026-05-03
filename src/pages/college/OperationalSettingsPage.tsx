import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  PageFrame,
  PageHero,
  FormCard,
  FormGrid,
  Field,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  itemVariants,
} from '@/components/college/primitives';
import { useCollegeSettings, DEFAULT_COLLEGE_SETTINGS } from '@/hooks/college/useCollegeSettings';

/* ==========================================================================
   OperationalSettingsPage — /college/settings/operational
   Edits the college_settings row that drives IQA sampling target, audit
   window, attendance bands and EPA verdict bands across the hub.
   ========================================================================== */

export default function OperationalSettingsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { settings, isLoading, update } = useCollegeSettings();

  const [iqaSampling, setIqaSampling] = useState(
    String(DEFAULT_COLLEGE_SETTINGS.iqa_sampling_target_percent)
  );
  const [auditWindow, setAuditWindow] = useState(
    String(DEFAULT_COLLEGE_SETTINGS.audit_window_days)
  );
  const [lowAttendance, setLowAttendance] = useState(
    String(DEFAULT_COLLEGE_SETTINGS.low_attendance_threshold_percent)
  );
  const [highAttendance, setHighAttendance] = useState(
    String(DEFAULT_COLLEGE_SETTINGS.high_attendance_threshold_percent)
  );
  const [bands, setBands] = useState(() =>
    JSON.stringify(DEFAULT_COLLEGE_SETTINGS.epa_verdict_bands, null, 2)
  );
  const [isSaving, setIsSaving] = useState(false);

  // Hydrate form from settings once they load.
  useEffect(() => {
    if (isLoading) return;
    setIqaSampling(String(settings.iqa_sampling_target_percent));
    setAuditWindow(String(settings.audit_window_days));
    setLowAttendance(String(settings.low_attendance_threshold_percent));
    setHighAttendance(String(settings.high_attendance_threshold_percent));
    setBands(JSON.stringify(settings.epa_verdict_bands, null, 2));
  }, [settings, isLoading]);

  const numericInRange = (raw: string, lo: number, hi: number): number | null => {
    const n = parseInt(raw, 10);
    if (Number.isNaN(n) || n < lo || n > hi) return null;
    return n;
  };

  const handleSave = async () => {
    const iqa = numericInRange(iqaSampling, 0, 100);
    const window = numericInRange(auditWindow, 1, 730);
    const low = numericInRange(lowAttendance, 0, 100);
    const high = numericInRange(highAttendance, 0, 100);

    if (iqa === null) {
      toast({ title: 'IQA sampling must be 0–100', variant: 'destructive' });
      return;
    }
    if (window === null) {
      toast({ title: 'Audit window must be 1–730 days', variant: 'destructive' });
      return;
    }
    if (low === null || high === null) {
      toast({ title: 'Attendance thresholds must be 0–100', variant: 'destructive' });
      return;
    }
    if (high < low) {
      toast({
        title: 'Threshold mismatch',
        description: 'High attendance threshold must be ≥ low threshold.',
        variant: 'destructive',
      });
      return;
    }

    let parsedBands: typeof DEFAULT_COLLEGE_SETTINGS.epa_verdict_bands;
    try {
      parsedBands = JSON.parse(bands);
      const requiredKeys = ['refer', 'not_yet', 'almost', 'ready'] as const;
      for (const k of requiredKeys) {
        const v = (parsedBands as Record<string, unknown>)[k];
        if (
          !Array.isArray(v) ||
          v.length !== 2 ||
          typeof v[0] !== 'number' ||
          typeof v[1] !== 'number'
        ) {
          throw new Error(`Band "${k}" must be [number, number]`);
        }
      }
    } catch (e) {
      toast({
        title: 'EPA verdict bands invalid',
        description: (e as Error).message,
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    try {
      await update.mutateAsync({
        iqa_sampling_target_percent: iqa,
        audit_window_days: window,
        low_attendance_threshold_percent: low,
        high_attendance_threshold_percent: high,
        epa_verdict_bands: parsedBands,
      });
      toast({ title: 'Operational settings saved' });
    } catch (e) {
      toast({
        title: 'Could not save settings',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setIqaSampling(String(DEFAULT_COLLEGE_SETTINGS.iqa_sampling_target_percent));
    setAuditWindow(String(DEFAULT_COLLEGE_SETTINGS.audit_window_days));
    setLowAttendance(String(DEFAULT_COLLEGE_SETTINGS.low_attendance_threshold_percent));
    setHighAttendance(String(DEFAULT_COLLEGE_SETTINGS.high_attendance_threshold_percent));
    setBands(JSON.stringify(DEFAULT_COLLEGE_SETTINGS.epa_verdict_bands, null, 2));
  };

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Resources · College Settings"
          title="Operational thresholds"
          description="Per-college configuration for IQA sampling rate, audit window, attendance bands and EPA verdict scoring. Changes flow through the hub in real-time."
          tone="indigo"
          actions={
            <SecondaryButton onClick={() => navigate(-1)} size="sm">
              ← Back
            </SecondaryButton>
          }
        />
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-5">
        <FormCard eyebrow="Quality Assurance">
          <FormGrid cols={2}>
            <Field
              label="IQA sampling target (%)"
              hint="Default 10%. Drives the sampling rate shown in the IQA Workflow KPIs and per-assessor breakdown."
            >
              <Input
                type="number"
                min={0}
                max={100}
                value={iqaSampling}
                onChange={(e) => setIqaSampling(e.target.value)}
                className={inputClass}
                inputMode="numeric"
              />
            </Field>
            <Field
              label="Audit window (days)"
              hint="How far back the Ofsted EIF dashboard aggregates signals. Default 90 days."
            >
              <Input
                type="number"
                min={1}
                max={730}
                value={auditWindow}
                onChange={(e) => setAuditWindow(e.target.value)}
                className={inputClass}
                inputMode="numeric"
              />
            </Field>
          </FormGrid>
        </FormCard>

        <FormCard eyebrow="Attendance">
          <FormGrid cols={2}>
            <Field
              label="Low attendance threshold (%)"
              hint="Below this is flagged red across student lists and dashboards. Default 80%."
            >
              <Input
                type="number"
                min={0}
                max={100}
                value={lowAttendance}
                onChange={(e) => setLowAttendance(e.target.value)}
                className={inputClass}
                inputMode="numeric"
              />
            </Field>
            <Field
              label="High attendance threshold (%)"
              hint="At or above this is flagged green. Default 90%."
            >
              <Input
                type="number"
                min={0}
                max={100}
                value={highAttendance}
                onChange={(e) => setHighAttendance(e.target.value)}
                className={inputClass}
                inputMode="numeric"
              />
            </Field>
          </FormGrid>
        </FormCard>

        <FormCard eyebrow="EPA Verdict Bands">
          <Field
            label="Bands (JSON)"
            hint="Each band is a [low, high] confidence range mapped to a verdict. Used by the EPA gauge across cohort + learner views. Defaults restore via Reset."
          >
            <textarea
              value={bands}
              onChange={(e) => setBands(e.target.value)}
              spellCheck={false}
              rows={9}
              autoCapitalize="off"
              autoCorrect="off"
              className="block w-full max-w-2xl bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl px-3 py-2.5 text-[13px] font-mono text-white placeholder:text-white/65 focus:outline-none focus:ring-2 focus:ring-elec-yellow/40 focus:border-elec-yellow/60 transition-colors resize-y touch-manipulation overflow-x-auto"
            />
          </Field>
        </FormCard>

        {/* Sticky save bar — desktop right-aligned, mobile pinned to bottom
            so the tutor never has to scroll back to commit changes. */}
        <div className="sticky bottom-0 -mx-4 sm:mx-0 px-4 sm:px-0 py-3 sm:py-4 bg-elec-dark/90 backdrop-blur-sm border-t border-white/[0.06] sm:border-0 sm:bg-transparent sm:backdrop-blur-none flex items-center justify-end gap-3 z-10">
          <SecondaryButton onClick={handleReset} disabled={isSaving}>
            Reset to defaults
          </SecondaryButton>
          <PrimaryButton onClick={handleSave} disabled={isSaving || isLoading}>
            {isSaving ? 'Saving…' : 'Save settings'}
          </PrimaryButton>
        </div>
      </motion.div>
    </PageFrame>
  );
}
