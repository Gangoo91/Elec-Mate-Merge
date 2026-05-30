import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { useFireWatchRecords } from '@/hooks/useFireWatchRecords';

import { SafetyMasthead } from '../common/SafetyModuleShell';
import { SignatureField } from '../common/SignatureField';
import { SafetyPhotoCapture } from '../common/SafetyPhotoCapture';
import { PermitSelector } from '../common/PermitSelector';
import { DeleteConfirmSheet } from '../common/DeleteConfirmSheet';
import { FireWatchHistory } from './FireWatchHistory';
import { PageHero, FilterBar, Field, Eyebrow, PrimaryButton, SecondaryButton, inputClass } from '@/components/college/primitives';

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
  { id: 'fw4', label: 'Smoke detector not isolated', checked: false },
  { id: 'fw5', label: 'Fire exit routes clear and unobstructed', checked: false },
];

type TabKey = 'timer' | 'history';
const DURATION_OPTIONS = [30, 45, 60, 90, 120] as const;
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
  const { data: historyRecords = [], isLoading: historyLoading, refetch: refetchHistory } = useFireWatchRecords();

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [durationMins, setDurationMins] = useState(60);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(DEFAULT_CHECKLIST);
  const [isSaving, setIsSaving] = useState(false);
  const [startedAt, setStartedAt] = useState<Date | null>(null);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [selectedPermitId, setSelectedPermitId] = useState<string | null>(null);
  const [selectedPermitTitle, setSelectedPermitTitle] = useState('');
  const [location, setLocation] = useState('');
  const [completerName, setCompleterName] = useState('');
  const [completerSig, setCompleterSig] = useState('');
  const [checkIns, setCheckIns] = useState<{ timestamp: string; notes: string; allClear: boolean }[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  useEffect(() => {
    if (isActive && !isPaused && !timerComplete) {
      intervalRef.current = setInterval(() => setElapsedSeconds((p) => p + 1), 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, isPaused, timerComplete]);

  const handleStart = () => {
    haptic.medium();
    setIsActive(true);
    setIsPaused(false);
    setStartedAt(new Date());
    setElapsedSeconds(0);
    setChecklist(DEFAULT_CHECKLIST);
  };

  const handleTogglePause = () => {
    haptic.light();
    setIsPaused((p) => !p);
  };

  const handleCancel = () => {
    haptic.medium();
    setIsActive(false);
    setIsPaused(false);
    setElapsedSeconds(0);
    setStartedAt(null);
    setChecklist(DEFAULT_CHECKLIST);
    setPhotoUrls([]);
    setSelectedPermitId(null);
    setSelectedPermitTitle('');
    setLocation('');
    setCheckIns([]);
    setShowCancelConfirm(false);
  };

  const toggleChecklistItem = (id: string) =>
    setChecklist((prev) => prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));

  const handleComplete = useCallback(async () => {
    if (!canComplete || !startedAt) return;
    setIsSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      const { error } = await supabase.from('fire_watch_records').insert({
        user_id: user.id,
        start_time: startedAt.toISOString(),
        end_time: new Date().toISOString(),
        duration_minutes: durationMins,
        permit_id: selectedPermitId || null,
        location: location.trim() || null,
        checklist: checklist.map((c) => ({ id: c.id, label: c.label, checked: c.checked })),
        status: 'completed',
        photos: photoUrls,
        completed_by: completerName.trim() || null,
        completed_signature: completerSig || null,
        check_ins: checkIns,
      });
      if (error) throw error;
      haptic.success();
      toast({ title: 'Fire watch complete', description: 'Record saved.' });
      refetchHistory();
      handleCancel();
    } catch {
      haptic.error();
      toast({ title: 'Error', description: 'Could not save fire watch record.', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canComplete, startedAt, checklist, photoUrls, durationMins, selectedPermitId, location, completerName, completerSig, checkIns, toast, haptic, refetchHistory]);

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
                timerComplete ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' : 'bg-amber-500/10 text-amber-400 border-amber-500/25'
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
            <motion.div key="timer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <AnimatePresence mode="wait">
                {!isActive ? (
                  <motion.div key="setup" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }} className="space-y-5">
                    <PageHero
                      eyebrow="Fire Watch · HSG168"
                      title="Watch the area after hot works"
                      description="A fire watch must run for at least 60 minutes after welding, brazing, grinding or torch work — stay in the area and check for smouldering."
                      tone="orange"
                    />

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
                      <input value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} placeholder="e.g. Plant Room 2, 3rd Floor" />
                    </Field>

                    <Field label="Watch duration">
                      <div className="flex gap-2">
                        {DURATION_OPTIONS.map((mins) => (
                          <button
                            key={mins}
                            onClick={() => setDurationMins(mins)}
                            className={cn(
                              'flex-1 h-11 rounded-xl text-[13px] font-medium touch-manipulation active:scale-[0.97] transition-all border',
                              durationMins === mins ? 'bg-elec-yellow text-black border-elec-yellow' : 'bg-[hsl(0_0%_10%)] text-white border-white/[0.08]'
                            )}
                          >
                            {mins}m
                          </button>
                        ))}
                      </div>
                    </Field>

                    <PrimaryButton fullWidth size="lg" onClick={handleStart}>
                      Start {durationMins}-minute fire watch
                    </PrimaryButton>
                  </motion.div>
                ) : (
                  <motion.div key="active" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.25 }} className="space-y-5">
                    {(selectedPermitId || location) && (
                      <div className="p-3 rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.08] space-y-1 text-[13px]">
                        {selectedPermitId && <div className="text-white font-medium">{selectedPermitTitle || 'Linked permit'}</div>}
                        {location && <div className="text-white/60">{location}</div>}
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
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200" aria-hidden="true">
                          <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
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
                            <span className="text-[15px] font-semibold text-emerald-400">Time complete</span>
                          ) : (
                            <>
                              <span className="text-[34px] font-semibold text-white tabular-nums">{formatTime(remainingSeconds)}</span>
                              <span className="text-[12px] text-white/55 mt-1">remaining</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center gap-6 text-[12px] text-white/55 tabular-nums">
                      <span>Elapsed {formatTime(elapsedSeconds)}</span>
                      <span>{durationMins} min watch</span>
                      {isPaused && <span className="text-amber-400 font-medium">Paused</span>}
                    </div>

                    {!timerComplete && (
                      <div className="flex gap-2">
                        <PrimaryButton fullWidth onClick={handleTogglePause} className={isPaused ? '' : 'bg-white/[0.06] text-white border border-white/[0.1] hover:bg-white/[0.1]'}>
                          {isPaused ? 'Resume' : 'Pause'}
                        </PrimaryButton>
                        <SecondaryButton onClick={() => setShowCancelConfirm(true)}>Cancel</SecondaryButton>
                      </div>
                    )}

                    {/* Check-in prompt */}
                    {checkInDue && (
                      <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-4 space-y-3">
                        <Eyebrow className="text-amber-300/90">Check-in #{checkIns.length + 1} due</Eyebrow>
                        <p className="text-[12px] text-white/70">Inspect the area for fire, smouldering or heat.</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setCheckIns([...checkIns, { timestamp: new Date().toISOString(), notes: '', allClear: true }])}
                            className="flex-1 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-[13px] font-semibold touch-manipulation active:scale-[0.97]"
                          >
                            All clear
                          </button>
                          <button
                            onClick={() => setCheckIns([...checkIns, { timestamp: new Date().toISOString(), notes: 'Issue found', allClear: false }])}
                            className="flex-1 h-11 rounded-xl bg-red-500/15 border border-red-500/25 text-red-400 text-[13px] font-semibold touch-manipulation active:scale-[0.97]"
                          >
                            Issue found
                          </button>
                        </div>
                      </div>
                    )}

                    {checkIns.length > 0 && (
                      <div className="space-y-1">
                        <Eyebrow>{checkIns.length} check-in{checkIns.length !== 1 ? 's' : ''}</Eyebrow>
                        {checkIns.map((ci, i) => (
                          <div key={i} className={cn('flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px]', ci.allClear ? 'bg-emerald-500/[0.06] text-emerald-400' : 'bg-red-500/[0.06] text-red-400')}>
                            <span>{ci.allClear ? 'All clear' : 'Issue'}</span>
                            <span className="ml-auto text-white/50 tabular-nums">
                              {new Date(ci.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
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
                            item.checked ? 'bg-emerald-500/[0.06] border-emerald-500/25' : 'bg-[hsl(0_0%_10%)] border-white/[0.08]'
                          )}
                        >
                          <span className={cn('h-5 w-5 rounded-full border flex items-center justify-center shrink-0 text-[11px] leading-none', item.checked ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-white/25 text-transparent')}>
                            ✓
                          </span>
                          <span className="text-[13px] text-white/90">{item.label}</span>
                        </button>
                      ))}
                    </div>

                    <div>
                      <Eyebrow className="mb-2">Area condition photos</Eyebrow>
                      <SafetyPhotoCapture photos={photoUrls} onPhotosChange={setPhotoUrls} label="" />
                    </div>

                    <SignatureField label="Completer signature" value={completerSig} onChange={setCompleterSig} />
                    <Field label="Completer name">
                      <input value={completerName} onChange={(e) => setCompleterName(e.target.value)} className={inputClass} placeholder="Watch person's name" />
                    </Field>

                    <PrimaryButton
                      fullWidth
                      size="lg"
                      disabled={!canComplete || isSaving}
                      onClick={handleComplete}
                    >
                      {isSaving ? 'Saving…' : !timerComplete ? 'Waiting for timer…' : !allChecked ? 'Complete all checks' : 'Complete fire watch'}
                    </PrimaryButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
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
