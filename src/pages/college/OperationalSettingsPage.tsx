import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { inputCn, labelCn } from '@/components/forms/fieldStyles';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import { useCollegeCan } from '@/hooks/useCollegeCan';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  CollegePageHeader,
  CollegeSectionTitle,
} from '@/components/college/ui/CollegeUi';
import { RiskThresholdsCard } from '@/components/college/settings/RiskThresholdsCard';
import { PEOPLE_PANEL } from '@/components/college/people/peopleKit';
import { useMyCollegeContext } from '@/hooks/useMyCollegeContext';
import {
  useCollegeSettings,
  DEFAULT_COLLEGE_SETTINGS,
  type EpaVerdictBands,
} from '@/hooks/college/useCollegeSettings';

/* ==========================================================================
   OperationalSettingsPage — /college/settings/operational

   Edits the college_settings row that drives IQA sampling target, audit
   window, attendance bands and EPA verdict bands across the hub.

   College Hub kit (7 Oct 2026): header with "?" → grouped cards (quality
   assurance, attendance, EPA readiness) → one Save with Reset beside it.
   The EPA bands were a raw JSON textarea; they are now four rows of from/to
   numbers with a bar showing how the 0–100 scale is split.

   8 Oct 2026: the risk flags (RiskThresholdsCard) moved here from Lesson
   plan settings, and the page says whether there is anything to save.
   ========================================================================== */

const HELP: PageHelpContent = {
  id: 'college-operational-settings',
  title: 'Quality thresholds',
  what: 'The numbers the hub uses to judge: when attendance is low, how much IQA should sample, how far back inspection signals look, and how an EPA readiness score becomes a verdict.',
  steps: [
    {
      title: 'Change a number',
      body: 'Each field says what it drives and its default. Nothing changes until you save.',
    },
    {
      title: 'Save',
      body: 'Saved for the whole college. Every screen in the hub picks it up within a second.',
    },
    {
      title: 'Start again',
      body: 'Reset to defaults puts every field back to the standard values; save to keep them.',
    },
  ],
  notes: [
    {
      title: 'EPA bands',
      body: 'A readiness score from 0 to 100 falls into one band. Bands should run end to end with no gaps, from 0 up to 100.',
    },
    {
      title: 'Risk flags',
      body: "At the bottom: the signs that add to a learner's risk score, and the score for medium, high and critical. They have their own Save and are used from the next nightly check, or straight away with Recheck risk now.",
    },
  ],
};

type BandKey = keyof EpaVerdictBands;
const BAND_ROWS: Array<{ key: BandKey; label: string; swatch: string }> = [
  { key: 'refer', label: 'Refer', swatch: 'bg-red-400' },
  { key: 'not_yet', label: 'Not yet', swatch: 'bg-orange-400' },
  { key: 'almost', label: 'Almost', swatch: 'bg-elec-yellow' },
  { key: 'ready', label: 'Ready', swatch: 'bg-emerald-400' },
];

const bandsToText = (b: EpaVerdictBands) =>
  Object.fromEntries(
    BAND_ROWS.map((r) => [r.key, [String(b[r.key][0]), String(b[r.key][1])]])
  ) as Record<BandKey, [string, string]>;

const BACK_TO = '/college?section=collegesettings';
const PUSH_CONTEXT = 'Get notified about marking, off-the-job hours and learners who need you';

export default function OperationalSettingsPage() {
  const { toast } = useToast();
  const { settings, isLoading, update } = useCollegeSettings();
  // ELE-1898: settings are for admins / heads of department (college_can
  // 'settings.manage', the same check the college_settings policy makes).
  const { can, loading: capsLoading } = useCollegeCan();
  const canEdit = can('settings.manage');

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
  const [bands, setBands] = useState(() => bandsToText(DEFAULT_COLLEGE_SETTINGS.epa_verdict_bands));
  const [isSaving, setIsSaving] = useState(false);
  const { staff: me } = useMyCollegeContext();
  const collegeId = me?.college_id ?? null;
  // Compare the form with what is stored, so the page can say "Unsaved changes".
  const dirty =
    !isLoading &&
    (iqaSampling !== String(settings.iqa_sampling_target_percent) ||
      auditWindow !== String(settings.audit_window_days) ||
      lowAttendance !== String(settings.low_attendance_threshold_percent) ||
      highAttendance !== String(settings.high_attendance_threshold_percent) ||
      JSON.stringify(bands) !== JSON.stringify(bandsToText(settings.epa_verdict_bands)));

  // Hydrate form from settings once they load.
  useEffect(() => {
    if (isLoading) return;
    setIqaSampling(String(settings.iqa_sampling_target_percent));
    setAuditWindow(String(settings.audit_window_days));
    setLowAttendance(String(settings.low_attendance_threshold_percent));
    setHighAttendance(String(settings.high_attendance_threshold_percent));
    setBands(bandsToText(settings.epa_verdict_bands));
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

    const parsedBands = {} as EpaVerdictBands;
    for (const r of BAND_ROWS) {
      const lo = numericInRange(bands[r.key][0], 0, 100);
      const hi = numericInRange(bands[r.key][1], 0, 100);
      if (lo === null || hi === null || hi < lo) {
        toast({
          title: 'EPA bands need fixing',
          description: `${r.label} must run from a number to a higher one, both 0 to 100.`,
          variant: 'destructive',
        });
        return;
      }
      parsedBands[r.key] = [lo, hi];
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
    setBands(bandsToText(DEFAULT_COLLEGE_SETTINGS.epa_verdict_bands));
  };

  const setBand = (k: BandKey, i: 0 | 1, v: string) =>
    setBands((prev) => {
      const next = { ...prev, [k]: [...prev[k]] as [string, string] };
      next[k][i] = v;
      return next;
    });

  return (
    <HubPage ground="landing">
      <HubMasthead
        section="College"
        title="Quality thresholds"
        backTo={BACK_TO}
        trailing={<PageHelpButton help={HELP} compact />}
      />
      <HubBody pushContext={PUSH_CONTEXT}>
        <CollegePageHeader
          eyebrow="Settings"
          title="Quality thresholds"
          description="The numbers the hub judges learners by: attendance colours, IQA sampling, the inspection window, EPA verdicts and risk flags. Saved for the whole college."
          actions={
            !canEdit ? undefined : (
              <>
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isSaving}
                  className={COLLEGE_BTN}
                >
                  Reset to defaults
                </button>
                <span className="hidden items-center gap-3 sm:inline-flex">
                  <span className="text-[12.5px] font-medium text-white">
                    {isLoading ? '' : dirty ? 'Unsaved changes' : 'All saved'}
                  </span>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving || isLoading || !dirty}
                    // Outline while there is nothing to save: a dimmed solid yellow reads brown.
                    className={dirty ? COLLEGE_BTN_PRIMARY : COLLEGE_BTN}
                  >
                    {isSaving ? 'Saving…' : 'Save settings'}
                  </button>
                </span>
              </>
            )
          }
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid items-stretch gap-6 lg:grid-cols-2"
        >
          <motion.section variants={itemVariants} className="flex flex-col space-y-3">
            <CollegeSectionTitle
              title="Quality assurance"
              sub="IQA sampling and the inspection window."
            />
            <div className={cn(PEOPLE_PANEL, 'flex-1 space-y-6')}>
              <Field
                id="iqa-sampling"
                label="IQA sampling target (%)"
                hint="Default 10%. The sampling rate shown in the IQA workflow and the per-assessor breakdown."
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
                label="Inspection window (days)"
                hint="How far back the inspection dashboard gathers signals. Default 90 days."
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
          </motion.section>

          <motion.section variants={itemVariants} className="flex flex-col space-y-3">
            <CollegeSectionTitle
              title="Attendance"
              sub="When a learner is flagged, and when they are doing well."
            />
            <div className={cn(PEOPLE_PANEL, 'flex-1 space-y-6')}>
              <Field
                id="low-attendance"
                label="Flag attendance below (%)"
                hint="Below this a learner shows orange across lists and dashboards. Default 80%."
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
                label="Good attendance from (%)"
                hint="At or above this shows green. Default 90%."
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
          </motion.section>

          <motion.section variants={itemVariants} className="space-y-3 lg:col-span-2">
            <CollegeSectionTitle
              title="EPA readiness verdicts"
              sub="How a readiness score from 0 to 100 becomes a verdict on the EPA gauge."
            />
            <div className={cn(PEOPLE_PANEL, 'space-y-5')}>
              <div
                className="flex h-3 w-full overflow-hidden rounded-full bg-white/[0.06]"
                aria-hidden
              >
                {BAND_ROWS.map((r) => {
                  const lo = Number(bands[r.key][0]) || 0;
                  const hi = Number(bands[r.key][1]) || 0;
                  return (
                    <span
                      key={r.key}
                      className={cn('h-full', r.swatch)}
                      style={{ width: `${Math.max(0, Math.min(100, hi - lo))}%` }}
                    />
                  );
                })}
              </div>
              <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 xl:grid-cols-4">
                {BAND_ROWS.map((r) => (
                  <div key={r.key}>
                    <p className="flex items-center gap-2 text-[13.5px] font-semibold text-white">
                      <span className={cn('h-2.5 w-2.5 rounded-full', r.swatch)} aria-hidden />
                      {r.label}
                    </p>
                    <div className="mt-1 grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor={`band-${r.key}-lo`} className={labelCn}>
                          From
                        </label>
                        <Input
                          id={`band-${r.key}-lo`}
                          type="number"
                          min={0}
                          max={100}
                          inputMode="numeric"
                          value={bands[r.key][0]}
                          onChange={(e) => setBand(r.key, 0, e.target.value)}
                          className={inputCn}
                        />
                      </div>
                      <div>
                        <label htmlFor={`band-${r.key}-hi`} className={labelCn}>
                          To
                        </label>
                        <Input
                          id={`band-${r.key}-hi`}
                          type="number"
                          min={0}
                          max={100}
                          inputMode="numeric"
                          value={bands[r.key][1]}
                          onChange={(e) => setBand(r.key, 1, e.target.value)}
                          className={inputCn}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        </motion.div>

        {collegeId && <RiskThresholdsCard collegeId={collegeId} />}

        {!canEdit && !capsLoading ? (
          <p className="rounded-xl border border-white/[0.10] bg-white/[0.04] p-4 text-[13px] leading-relaxed text-white">
            You can read these numbers. Only a college admin or head of department can change them.
          </p>
        ) : null}
        {/* Sticky on phones so the tutor never scrolls back to commit. */}
        <div
          className={cn(
            'sticky bottom-0 z-10 -mx-4 flex gap-2 border-t border-white/[0.06] bg-elec-dark/95 px-4 py-3 backdrop-blur-sm sm:hidden',
            !canEdit && 'hidden'
          )}
        >
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || isLoading || !dirty}
            className={cn(dirty ? COLLEGE_BTN_PRIMARY : COLLEGE_BTN, 'flex-1')}
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
