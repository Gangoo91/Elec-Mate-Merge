import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { useToast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { useFireWatchRecords, FOLLOW_UP_AFTER_HOURS } from '@/hooks/useFireWatchRecords';

import { SafetyMasthead } from '../common/SafetyModuleShell';
import { SignatureField } from '../common/SignatureField';
import { SafetyPhotoCapture } from '../common/SafetyPhotoCapture';
import { PermitSelector } from '../common/PermitSelector';
import { DeleteConfirmSheet } from '../common/DeleteConfirmSheet';
import { JobLinkField } from '../common/JobLinkField';
import { FireWatchHistory } from './FireWatchHistory';
import {
  FilterBar,
  Field,
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
} from '@/components/college/primitives';
import { safetyInputCn } from '../common/SafetyDocField';
import { SafetyPageHeader } from '../common/SafetyPageHeader';

interface FireWatchTimerProps {
  onBack: () => void;
}

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

const DEFAULT_CHECKLIST: ChecklistItem[] = [
  { id: 'fw1', label: 'Area clear of combustible materials', checked: false },
  { id: 'fw2', label: 'Fire extinguisher present and accessible', checked: false },
  { id: 'fw3', label: 'Combustible materials removed or protected', checked: false },
  // "Smoke detector not isolated" read as a precondition, but detection is
  // routinely isolated for the hot work itself. What matters during the watch
  // is that it has been put back — HSG168 para 122 makes reinstatement at every
  // break and at the end of each day the controlled step. Matches the wording
  // now used on the permit close-out.
  { id: 'fw4', label: 'Fire detection reinstated and confirmed working', checked: false },
  { id: 'fw5', label: 'Fire exit routes clear and unobstructed', checked: false },
];

type TabKey = 'timer' | 'history';
/**
 * HSG168 para 122 puts the continuous watch at "at least an hour".
 *
 * These were [30, 45, 60, 90, 120] rendered as five identical buttons, so the
 * screen offered a 30-minute fire watch with exactly the same affordance as a
 * compliant one — directly beneath a hero quoting the one-hour minimum. The
 * interface contradicted the guidance it printed.
 *
 * The short options are kept, because a watch that got cut short is a real
 * thing and the honest record of it is worth more than a tidy list. They are
 * no longer presented as equals: they sit behind a disclosure and say plainly
 * what they are.
 */
const DURATION_OPTIONS = [60, 90, 120] as const;
const SHORT_DURATION_OPTIONS = [30, 45] as const;
const HSG168_MINIMUM_MINS = 60;
const CHECK_IN_INTERVAL = 30; // minutes

function formatTime(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function FireWatchTimer({ onBack }: FireWatchTimerProps) {
  const haptic = useHaptic();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabKey>('timer');
  const {
    data: historyRecords = [],
    isLoading: historyLoading,
    refetch: refetchHistory,
  } = useFireWatchRecords();

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [durationMins, setDurationMins] = useState(60);
  /*
   * Elapsed time is derived from the wall clock, not counted in ticks.
   *
   * This used to be `setInterval(() => setElapsedSeconds(p => p + 1), 1000)`.
   * A fire watch runs for 60 to 120 minutes on a phone that is in someone's
   * pocket, and browsers throttle or suspend timers in a backgrounded tab —
   * on iOS they stop altogether when the screen locks. So the counter drifted
   * behind real time by however long the screen was off: an electrician who
   * genuinely stood there for the full hour came back to a timer reading
   * twenty minutes, and `canComplete` refused to let them close the watch
   * they had actually done. Reading the clock is right whatever the OS did
   * with our timer; the interval below now only exists to trigger a re-render.
   */
  const [nowTick, setNowTick] = useState(() => Date.now());
  const [pausedAccumMs, setPausedAccumMs] = useState(0);
  const [pausedAt, setPausedAt] = useState<number | null>(null);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(DEFAULT_CHECKLIST);
  const [isSaving, setIsSaving] = useState(false);
  const [startedAt, setStartedAt] = useState<Date | null>(null);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showShortDurations, setShowShortDurations] = useState(false);
  const [selectedPermitId, setSelectedPermitId] = useState<string | null>(null);
  const [selectedPermitTitle, setSelectedPermitTitle] = useState('');
  const [linkedJobId, setLinkedJobId] = useState<string | null>(null);
  const [linkedJobTitle, setLinkedJobTitle] = useState<string | null>(null);
  const [location, setLocation] = useState('');
  const [completerName, setCompleterName] = useState('');
  const [completerSig, setCompleterSig] = useState('');
  const [checkIns, setCheckIns] = useState<
    { timestamp: string; notes: string; allClear: boolean }[]
  >([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Time spent paused is excluded, including the pause currently in progress,
  // so elapsed freezes while paused and resumes from where it stopped.
  const elapsedSeconds = startedAt
    ? Math.max(
        0,
        Math.floor(
          (nowTick -
            startedAt.getTime() -
            pausedAccumMs -
            (pausedAt !== null ? nowTick - pausedAt : 0)) /
            1000
        )
      )
    : 0;

  const durationSecs = durationMins * 60;
  const remainingSeconds = Math.max(durationSecs - elapsedSeconds, 0);
  const progress = Math.min(elapsedSeconds / durationSecs, 1);
  const allChecked = checklist.every((item) => item.checked);
  const timerComplete = elapsedSeconds >= durationSecs;
  const canComplete = allChecked && timerComplete;

  const nextCheckInAt =
    checkIns.length > 0
      ? new Date(checkIns[checkIns.length - 1].timestamp).getTime() + CHECK_IN_INTERVAL * 60 * 1000
      : startedAt
        ? startedAt.getTime() + CHECK_IN_INTERVAL * 60 * 1000
        : 0;
  const checkInDue = isActive && !isPaused && Date.now() >= nextCheckInAt && !timerComplete;

  // Re-render once a second while the watch is running. The value shown comes
  // from the clock, so a throttled or suspended interval costs a stale frame,
  // never a wrong elapsed time.
  useEffect(() => {
    if (!isActive) return;
    intervalRef.current = setInterval(() => setNowTick(Date.now()), 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  // Coming back from a locked screen should snap to the true time immediately
  // rather than waiting for the next tick.
  useEffect(() => {
    if (!isActive) return;
    const resync = () => setNowTick(Date.now());
    document.addEventListener('visibilitychange', resync);
    window.addEventListener('focus', resync);
    return () => {
      document.removeEventListener('visibilitychange', resync);
      window.removeEventListener('focus', resync);
    };
  }, [isActive]);

  const handleStart = () => {
    haptic.medium();
    setIsActive(true);
    setIsPaused(false);
    setStartedAt(new Date());
    setNowTick(Date.now());
    setPausedAccumMs(0);
    setPausedAt(null);
    setChecklist(DEFAULT_CHECKLIST);
  };

  const handleTogglePause = () => {
    haptic.light();
    // Bank the pause on resume so elapsed excludes it.
    if (pausedAt !== null) {
      setPausedAccumMs((ms) => ms + (Date.now() - pausedAt));
      setPausedAt(null);
      setIsPaused(false);
    } else {
      setPausedAt(Date.now());
      setIsPaused(true);
    }
    setNowTick(Date.now());
  };

  const handleCancel = () => {
    haptic.medium();
    setIsActive(false);
    setIsPaused(false);
    setStartedAt(null);
    setPausedAccumMs(0);
    setPausedAt(null);
    setChecklist(DEFAULT_CHECKLIST);
    setPhotoUrls([]);
    setSelectedPermitId(null);
    setSelectedPermitTitle('');
    setLinkedJobId(null);
    setLinkedJobTitle(null);
    setLocation('');
    setCheckIns([]);
    setShowCancelConfirm(false);
  };

  const toggleChecklistItem = (id: string) =>
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );

  const handleComplete = useCallback(async () => {
    if (!canComplete || !startedAt) return;
    setIsSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      // The hour of continuous watch is only the first half of HSG168 para 122
      // — a further check falls due two hours after the hot work ended. The
      // record therefore closes as 'awaiting_follow_up' with that time stamped
      // on it, and only becomes 'completed' when the check is signed off.
      const endedAt = new Date();
      const followUpDueAt = new Date(startedAt.getTime() + FOLLOW_UP_AFTER_HOURS * 60 * 60 * 1000);
      const { error } = await supabase.from('fire_watch_records').insert({
        user_id: user.id,
        start_time: startedAt.toISOString(),
        end_time: endedAt.toISOString(),
        duration_minutes: durationMins,
        permit_id: selectedPermitId || null,
        job_id: linkedJobId || null,
        location: location.trim() || null,
        checklist: checklist.map((c) => ({ id: c.id, label: c.label, checked: c.checked })),
        status: 'awaiting_follow_up',
        follow_up_due_at: followUpDueAt.toISOString(),
        photos: photoUrls,
        completed_by: completerName.trim() || null,
        completed_signature: completerSig || null,
        check_ins: checkIns,
      });
      if (error) throw error;
      haptic.success();
      toast({
        title: 'Watch logged — one check still to do',
        description: `Return at ${followUpDueAt.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
        })} for the two-hour check (HSG168).`,
      });
      refetchHistory();
      handleCancel();
    } catch {
      haptic.error();
      toast({
        title: 'Error',
        description: 'Could not save fire watch record.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    canComplete,
    startedAt,
    checklist,
    photoUrls,
    durationMins,
    selectedPermitId,
    linkedJobId,
    location,
    completerName,
    completerSig,
    checkIns,
    toast,
    haptic,
    refetchHistory,
  ]);

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="bg-elec-dark min-h-screen pb-24">
      <SafetyMasthead
        onBack={onBack}
        moduleName="Fire Watch"
        trailing={
          isActive ? (
            <span
              className={cn(
                'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border',
                timerComplete
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/25'
              )}
            >
              {timerComplete ? 'Complete' : 'Running'}
            </span>
          ) : undefined
        }
      />

      <div className="mx-auto max-w-xl px-4 pt-4 space-y-5">
        <FilterBar
          tabs={[
            { value: 'timer', label: 'Timer' },
            { value: 'history', label: 'History', count: historyRecords.length },
          ]}
          activeTab={activeTab}
          onTabChange={(v) => setActiveTab(v as TabKey)}
        />

        <AnimatePresence mode="wait">
          {activeTab === 'timer' ? (
            <motion.div
              key="timer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {!isActive ? (
                  <motion.div
                    key="setup"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <SafetyPageHeader
                      eyebrow="Fire Watch · HSG168"
                      title="Watch the area after hot works"
                      description="An hour of continuous watch after the torch goes out, then one more check two hours later. We'll time the first and remind you about the second."
                      tone="orange"
                    />

                    {/*
                     * Was six elements in one flat space-y-5 stack — hero,
                     * permit, location, project, duration, start — every one
                     * at the same visual weight, so "Link to project
                     * (optional)" shouted as loudly as the duration you are
                     * about to commit to.
                     *
                     * Two blocks now. The optional links are quiet and come
                     * first; the decision and the action are one loud card at
                     * the bottom, which is also where a thumb actually is on a
                     * phone held one-handed in a plant room.
                     */}
                    <section className="space-y-4">
                      <h2 className="text-[12px] font-medium uppercase tracking-[0.12em] text-white">
                        Where and what for
                      </h2>

                      <PermitSelector
                        permitTypes={['hot-work']}
                        selectedPermitId={selectedPermitId}
                        onSelect={(id, permit) => {
                          setSelectedPermitId(id);
                          setSelectedPermitTitle(permit?.title ?? '');
                          setLocation(permit?.location ?? '');
                        }}
                        label="Link to hot-work permit (optional)"
                      />

                      <Field label="Location / area">
                        <input
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className={safetyInputCn}
                          placeholder="e.g. Plant Room 2, 3rd Floor"
                        />
                      </Field>

                      <JobLinkField
                        jobId={linkedJobId}
                        jobTitle={linkedJobTitle}
                        onSelect={(id, title) => {
                          setLinkedJobId(id);
                          setLinkedJobTitle(title);
                        }}
                      />
                    </section>

                    <section
                      className={cn(
                        'rounded-2xl border border-elec-yellow/35 p-4 space-y-4',
                        CARD_SURFACE
                      )}
                    >
                      <div>
                        <h2 className="text-[15px] font-semibold tracking-tight text-white">
                          How long are you watching for?
                        </h2>
                        <p className="mt-1 text-[12.5px] leading-relaxed text-white">
                          HSG168 sets the minimum at one hour of continuous watch.
                        </p>
                      </div>

                      <div className="flex gap-2">
                        {DURATION_OPTIONS.map((mins) => (
                          <button
                            key={mins}
                            onClick={() => setDurationMins(mins)}
                            aria-pressed={durationMins === mins}
                            className={cn(
                              'h-12 flex-1 rounded-xl border text-[14px] font-semibold tabular-nums touch-manipulation transition-all active:scale-[0.97]',
                              durationMins === mins
                                ? 'border-elec-yellow bg-elec-yellow text-black'
                                : 'border-white/[0.12] bg-white/[0.06] text-white'
                            )}
                          >
                            {mins}m
                          </button>
                        ))}
                      </div>

                      {/* Behind a disclosure, not in the main row. Someone whose
                          watch was genuinely cut short should be able to record
                          that truthfully — but they should not reach it by
                          default, and it should never look like a normal
                          choice. */}
                      {!showShortDurations && durationMins >= HSG168_MINIMUM_MINS && (
                        <button
                          type="button"
                          onClick={() => setShowShortDurations(true)}
                          className="min-h-11 text-left text-[12px] font-medium text-white underline-offset-4 touch-manipulation hover:underline"
                        >
                          The watch was cut short
                        </button>
                      )}

                      {(showShortDurations || durationMins < HSG168_MINIMUM_MINS) && (
                        <div className="flex gap-2">
                          {SHORT_DURATION_OPTIONS.map((mins) => (
                            <button
                              key={mins}
                              onClick={() => setDurationMins(mins)}
                              aria-pressed={durationMins === mins}
                              className={cn(
                                'h-12 flex-1 rounded-xl border text-[14px] font-semibold tabular-nums touch-manipulation transition-all active:scale-[0.97]',
                                durationMins === mins
                                  ? 'border-red-500 bg-red-500 text-white'
                                  : 'border-white/[0.12] bg-white/[0.06] text-white'
                              )}
                            >
                              {mins}m
                            </button>
                          ))}
                        </div>
                      )}

                      {durationMins < HSG168_MINIMUM_MINS && (
                        <p className="text-[12px] leading-relaxed text-red-400">
                          Below the HSG168 minimum of one hour. This will be recorded as a short
                          watch — the area still needs its check two hours after the work ended.
                        </p>
                      )}

                      <PrimaryButton fullWidth size="lg" onClick={handleStart}>
                        Start {durationMins}-minute fire watch
                      </PrimaryButton>
                    </section>
                  </motion.div>
                ) : (
                  <motion.div
                    key="active"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    {(selectedPermitId || linkedJobId || location) && (
                      <div
                        className={cn(
                          'p-3 rounded-xl border border-elec-yellow/35 space-y-1 text-[13px]',
                          CARD_SURFACE
                        )}
                      >
                        {selectedPermitId && (
                          <div className="text-white font-medium">
                            {selectedPermitTitle || 'Linked permit'}
                          </div>
                        )}
                        {linkedJobId && (
                          <div className="text-white">
                            Project: {linkedJobTitle || 'Linked project'}
                          </div>
                        )}
                        {location && <div className="text-white">{location}</div>}
                      </div>
                    )}

                    {/* Circular timer */}
                    <div className="flex justify-center">
                      <div
                        className="relative w-52 h-52"
                        role="timer"
                        aria-label={
                          timerComplete
                            ? 'Fire watch time complete'
                            : `${Math.floor(remainingSeconds / 60)} minutes ${remainingSeconds % 60} seconds remaining of the fire watch`
                        }
                      >
                        <svg
                          className="w-full h-full -rotate-90"
                          viewBox="0 0 200 200"
                          aria-hidden="true"
                        >
                          <circle
                            cx="100"
                            cy="100"
                            r="90"
                            fill="none"
                            stroke="rgba(255,255,255,0.08)"
                            strokeWidth="8"
                          />
                          <circle
                            cx="100"
                            cy="100"
                            r="90"
                            fill="none"
                            stroke={timerComplete ? '#34d399' : '#f59e0b'}
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-1000 ease-linear"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          {timerComplete ? (
                            <span className="text-[15px] font-semibold text-emerald-400">
                              Time complete
                            </span>
                          ) : (
                            <>
                              <span className="text-[34px] font-semibold text-white tabular-nums">
                                {formatTime(remainingSeconds)}
                              </span>
                              <span className="text-[12px] text-white mt-1">remaining</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center gap-6 text-[12px] text-white tabular-nums">
                      <span>Elapsed {formatTime(elapsedSeconds)}</span>
                      <span>{durationMins} min watch</span>
                      {isPaused && <span className="text-amber-400 font-medium">Paused</span>}
                    </div>

                    {!timerComplete && (
                      <div className="flex gap-2">
                        {/* Resume is the primary action when paused; pausing a
                            running watch is not. This was one PrimaryButton with
                            its own styling overridden to look secondary, which
                            fought the component instead of using the other one. */}
                        {isPaused ? (
                          <PrimaryButton fullWidth onClick={handleTogglePause}>
                            Resume
                          </PrimaryButton>
                        ) : (
                          <SecondaryButton fullWidth onClick={handleTogglePause}>
                            Pause
                          </SecondaryButton>
                        )}
                        <SecondaryButton onClick={() => setShowCancelConfirm(true)}>
                          Cancel
                        </SecondaryButton>
                      </div>
                    )}

                    {/* Check-in prompt */}
                    {checkInDue && (
                      <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-4 space-y-3">
                        <Eyebrow className="text-amber-400">
                          Check-in #{checkIns.length + 1} due
                        </Eyebrow>
                        <p className="text-[12px] text-white">
                          Inspect the area for fire, smouldering or heat.
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              setCheckIns([
                                ...checkIns,
                                { timestamp: new Date().toISOString(), notes: '', allClear: true },
                              ])
                            }
                            className="flex-1 h-11 rounded-xl border border-white/10 bg-white/[0.05] text-[13px] font-semibold text-emerald-400 touch-manipulation active:scale-[0.97]"
                          >
                            All clear
                          </button>
                          <button
                            onClick={() =>
                              setCheckIns([
                                ...checkIns,
                                {
                                  timestamp: new Date().toISOString(),
                                  notes: 'Issue found',
                                  allClear: false,
                                },
                              ])
                            }
                            className="flex-1 h-11 rounded-xl border border-white/10 bg-white/[0.05] text-[13px] font-semibold text-red-400 touch-manipulation active:scale-[0.97]"
                          >
                            Issue found
                          </button>
                        </div>
                      </div>
                    )}

                    {checkIns.length > 0 && (
                      <div className="space-y-1">
                        <Eyebrow>
                          {checkIns.length} check-in{checkIns.length !== 1 ? 's' : ''}
                        </Eyebrow>
                        {checkIns.map((ci, i) => (
                          <div
                            key={i}
                            className={cn(
                              'flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px]',
                              ci.allClear
                                ? 'bg-emerald-500/[0.06] text-emerald-400'
                                : 'bg-red-500/[0.06] text-red-400'
                            )}
                          >
                            <span>{ci.allClear ? 'All clear' : 'Issue'}</span>
                            <span className="ml-auto text-white tabular-nums">
                              {new Date(ci.timestamp).toLocaleTimeString('en-GB', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Checklist */}
                    <div className="space-y-2">
                      <Eyebrow>Fire watch checklist</Eyebrow>
                      {checklist.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => toggleChecklistItem(item.id)}
                          className={cn(
                            'w-full flex items-center gap-3 p-3.5 rounded-xl border text-left touch-manipulation active:scale-[0.99] transition-all',
                            item.checked
                              ? 'bg-emerald-500/[0.06] border-emerald-500/25'
                              : cn(CARD_SURFACE, 'border-white/[0.08]')
                          )}
                        >
                          <span
                            className={cn(
                              'h-5 w-5 rounded-full border flex items-center justify-center shrink-0 text-[11px] leading-none',
                              item.checked
                                ? 'bg-emerald-500 border-emerald-500 text-black'
                                : 'border-white/25 text-transparent'
                            )}
                          >
                            ✓
                          </span>
                          <span className="text-[13px] text-white">{item.label}</span>
                        </button>
                      ))}
                    </div>

                    <div>
                      <Eyebrow className="mb-2">Area condition photos</Eyebrow>
                      <SafetyPhotoCapture
                        photos={photoUrls}
                        onPhotosChange={setPhotoUrls}
                        label=""
                      />
                    </div>

                    <SignatureField
                      label="Completer signature"
                      value={completerSig}
                      onChange={setCompleterSig}
                    />
                    <Field label="Completer name">
                      <input
                        value={completerName}
                        onChange={(e) => setCompleterName(e.target.value)}
                        className={safetyInputCn}
                        placeholder="Watch person's name"
                      />
                    </Field>

                    <PrimaryButton
                      fullWidth
                      size="lg"
                      disabled={!canComplete || isSaving}
                      onClick={handleComplete}
                    >
                      {isSaving
                        ? 'Saving…'
                        : !timerComplete
                          ? 'Waiting for timer…'
                          : !allChecked
                            ? 'Complete all checks'
                            : 'Complete fire watch'}
                    </PrimaryButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="history"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FireWatchHistory
                records={historyRecords}
                isLoading={historyLoading}
                onStartNewWatch={() => {
                  setActiveTab('timer');
                  handleStart();
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <DeleteConfirmSheet
        open={showCancelConfirm}
        onOpenChange={setShowCancelConfirm}
        onConfirm={handleCancel}
        title="Cancel fire watch?"
        description="All progress will be lost and the timer will reset"
      />
    </div>
  );
}

export default FireWatchTimer;
