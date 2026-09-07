import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { inputCn, labelCn, textareaCn } from '@/components/forms/fieldStyles';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead, HubSectionHeading } from '@/components/hub/HubPrimitives';
import { useCollegeSettings, DEFAULT_COLLEGE_SETTINGS } from '@/hooks/college/useCollegeSettings';

/* ==========================================================================
   OperationalSettingsPage — /college/settings/operational

   Edits the college_settings row that drives IQA sampling target, audit
   window, attendance bands and EPA verdict bands across the hub.

   Rebuilt on the shared hub shell: masthead → three cards → one solid volt
   Save with a neutral Reset beside it. The indigo hero and the FormCard
   eyebrows are gone.
   ========================================================================== */

const BACK_TO = '/college?section=collegesettings';
const PUSH_CONTEXT = 'Get notified about marking, off-the-job hours and learners who need you';

const CARD = cn(
  '-mx-4 space-y-5 border-y border-elec-yellow/35 px-4 py-5 sm:mx-0 sm:rounded-2xl sm:border-x sm:px-5',
  CARD_SURFACE
);

export default function OperationalSettingsPage() {
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
        description: 'High attendance threshold must be at or above the low threshold.',
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
    <HubPage>
      <HubMasthead section="College" title="Operational thresholds" backTo={BACK_TO} />
      <HubBody pushContext={PUSH_CONTEXT}>
        <p className="-mb-4 max-w-prose text-[13px] leading-relaxed text-white sm:-mb-6">
          Per-college thresholds for IQA sampling, the audit window, attendance bands and EPA
          verdict scoring. Changes reach every screen in the hub within a second.
        </p>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <HubSectionHeading>Quality assurance</HubSectionHeading>
          <motion.div variants={itemVariants} className={CARD}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              <Field
                id="iqa-sampling"
                label="IQA sampling target (%)"
                hint="Default 10%. Drives the sampling rate shown in the IQA workflow KPIs and the per-assessor breakdown."
              >
                <Input
                  id="iqa-sampling"
                  type="number"
                  min={0}
                  max={100}
                  value={iqaSampling}
                  onChange={(e) => setIqaSampling(e.target.value)}
                  className={inputCn}
                  inputMode="numeric"
                />
              </Field>
              <Field
                id="audit-window"
                label="Audit window (days)"
                hint="How far back the Ofsted EIF dashboard aggregates signals. Default 90 days."
              >
                <Input
                  id="audit-window"
                  type="number"
                  min={1}
                  max={730}
                  value={auditWindow}
                  onChange={(e) => setAuditWindow(e.target.value)}
                  className={inputCn}
                  inputMode="numeric"
                />
              </Field>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <HubSectionHeading>Attendance</HubSectionHeading>
          <motion.div variants={itemVariants} className={CARD}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              <Field
                id="low-attendance"
                label="Low attendance threshold (%)"
                hint="Below this is flagged red across learner lists and dashboards. Default 80%."
              >
                <Input
                  id="low-attendance"
                  type="number"
                  min={0}
                  max={100}
                  value={lowAttendance}
                  onChange={(e) => setLowAttendance(e.target.value)}
                  className={inputCn}
                  inputMode="numeric"
                />
              </Field>
              <Field
                id="high-attendance"
                label="High attendance threshold (%)"
                hint="At or above this is flagged green. Default 90%."
              >
                <Input
                  id="high-attendance"
                  type="number"
                  min={0}
                  max={100}
                  value={highAttendance}
                  onChange={(e) => setHighAttendance(e.target.value)}
                  className={inputCn}
                  inputMode="numeric"
                />
              </Field>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <HubSectionHeading>EPA verdict bands</HubSectionHeading>
          <motion.div variants={itemVariants} className={CARD}>
            <Field
              id="epa-bands"
              label="Bands (JSON)"
              hint="Each band is a [low, high] confidence range mapped to a verdict. Used by the EPA gauge across cohort and learner views. Reset restores the defaults."
            >
              <textarea
                id="epa-bands"
                value={bands}
                onChange={(e) => setBands(e.target.value)}
                spellCheck={false}
                rows={9}
                autoCapitalize="off"
                autoCorrect="off"
                className={cn(textareaCn, 'max-w-2xl font-mono text-[13px]')}
              />
            </Field>
          </motion.div>
        </motion.section>

        {/* One solid volt control. Reset is the neutral one beside it. Sticky
            on phones so the tutor never scrolls back to commit. */}
        <div className="sticky bottom-0 z-10 -mx-4 flex flex-col gap-3 border-t border-white/[0.06] bg-elec-dark/95 px-4 py-3 backdrop-blur-sm sm:mx-0 sm:flex-row sm:items-center sm:justify-end sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
          <button
            type="button"
            onClick={handleReset}
            disabled={isSaving}
            className="h-11 w-full rounded-full border border-white/[0.12] bg-white/[0.06] px-5 text-[13px] font-medium text-white transition-colors touch-manipulation hover:bg-white/[0.09] disabled:opacity-50 sm:w-auto"
          >
            Reset to defaults
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || isLoading}
            className="h-11 w-full rounded-full bg-elec-yellow px-6 text-[13px] font-semibold text-black transition-colors touch-manipulation hover:bg-elec-yellow/90 disabled:bg-white/[0.08] disabled:text-white sm:w-auto"
          >
            {isSaving ? 'Saving…' : 'Save settings'}
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
}

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelCn}>
        {label}
      </label>
      {children}
      <p className="mt-1.5 text-[12px] leading-snug text-white">{hint}</p>
    </div>
  );
}
