import { useState, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import {
  useElectricianSiteDiary,
  useCreateDiaryEntry,
  useDeleteDiaryEntry,
  type SiteDiaryEntry,
} from '@/hooks/useElectricianSiteDiary';
import { useActivePermits } from '@/hooks/usePermitsToWork';
import { useRAMSDocumentsByStatus } from '@/hooks/useRAMSDocuments';
import { useSparkProjects } from '@/hooks/useSparkProjects';
import { useHaptic } from '@/hooks/useHaptic';
import { useFieldValidation } from '@/hooks/useFieldValidation';
import { useLocalDraft } from '@/hooks/useLocalDraft';

import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import {
  Eyebrow,
  Field,
  FormCard,
  EmptyState,
  LoadingState,
  PrimaryButton,
  SecondaryButton,
} from '@/components/college/primitives';

import { safetyInputCn, safetySelectTriggerCn, safetyTextareaCn } from '../common/SafetyDocField';
import { SafetyMasthead } from '../common/SafetyModuleShell';
import { SignatureField } from '../common/SignatureField';
import { SmartTextarea } from '../common/SmartTextarea';
import { SafetyPhotoCapture } from '../common/SafetyPhotoCapture';
import { LocationAutoFill } from '../common/LocationAutoFill';
import { SwipeableListItem } from '../common/SwipeableListItem';
import { DeleteConfirmSheet } from '../common/DeleteConfirmSheet';
import { DraftRecoveryBanner } from '../common/DraftRecoveryBanner';
import { DraftSaveIndicator } from '../common/DraftSaveIndicator';
import { SafetyDocumentShare } from '../common/SafetyDocumentShare';
import { JobLinkField } from '../common/JobLinkField';
import { SafetyListCard, SafetyListRow } from '../common/SafetyList';

interface ElectricianSiteDiaryProps {
  onBack: () => void;
}

/**
 * A selected RAMS / permit, tap-anywhere to unlink.
 *
 * The remove control was a bare "×" glyph inside the chip: a ~10px target on a
 * screen used in gloves. The whole chip is the control now, at the 44px
 * minimum, and the × stays as the affordance rather than as the hit area.
 */
function SelectedChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      aria-label={`Remove ${label}`}
      className={cn(
        'inline-flex h-11 items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.05] px-3',
        'text-[12.5px] text-white transition-all',
        'touch-manipulation active:scale-[0.97] active:brightness-125 [-webkit-tap-highlight-color:transparent]'
      )}
    >
      <span className="max-w-[180px] truncate">{label}</span>
      <span aria-hidden className="text-[14px] leading-none text-white">
        ×
      </span>
    </button>
  );
}

/**
 * FormCard's body is a flat `hsl(0 0% 12%)` fill; `bg-transparent` clears it so
 * the card recipe's ramp sits on near-black. See `common/SafetyList.tsx`.
 */
const CARD_CN = cn('bg-transparent border-elec-yellow/35', CARD_SURFACE);

const WEATHER_OPTIONS = [
  { value: 'sunny', label: 'Sunny' },
  { value: 'cloudy', label: 'Cloudy' },
  { value: 'rain', label: 'Rain' },
  { value: 'snow', label: 'Snow' },
  { value: 'windy', label: 'Windy' },
];

function generateCalendarDays(baseDate: Date): Date[] {
  const days: Date[] = [];
  const start = new Date(baseDate);
  start.setDate(start.getDate() - 14);
  for (let i = 0; i < 29; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    days.push(d);
  }
  return days;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * The calendar key for a day, in LOCAL time.
 *
 * This was `d.toISOString().split('T')[0]`, which is UTC. Every date in this
 * screen carries the current time of day (`generateCalendarDays` copies it from
 * `new Date()`), so between midnight and 01:00 during British Summer Time the
 * UTC date is still yesterday: at 00:30 on 9 August, `toISOString()` returns
 * 2026-08-08. Both the key an entry is filed under and the key each calendar
 * cell matches shifted back a day together, so an entry logged just after
 * midnight was written to the previous day's date and the "today" highlight sat
 * on the wrong cell — while `isSameDay` right above used local getters and
 * disagreed with both.
 *
 * `entry_date` is a Postgres `date`, so a local calendar date is what belongs
 * in it.
 */
function formatDateKey(d: Date): string {
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

export function ElectricianSiteDiary({ onBack }: ElectricianSiteDiaryProps) {
  const haptic = useHaptic();
  const [shareRecordId, setShareRecordId] = useState<string | null>(null);
  const [shareRecordTitle, setShareRecordTitle] = useState('');
  const today = useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = useState(today);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const validation = useFieldValidation({
    siteName: { required: true, message: 'Site name is required' },
  });

  // Form field state
  const [siteAddress, setSiteAddress] = useState('');
  const [weather, setWeather] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [personnelCount, setPersonnelCount] = useState('');
  const [workCompleted, setWorkCompleted] = useState('');
  const [issues, setIssues] = useState('');
  const [materialsUsed, setMaterialsUsed] = useState('');
  const [notes, setNotes] = useState('');
  const [diaryPhotos, setDiaryPhotos] = useState<string[]>([]);
  const [selectedRamsIds, setSelectedRamsIds] = useState<string[]>([]);
  const [selectedPermitIds, setSelectedPermitIds] = useState<string[]>([]);
  const [recorderSig, setRecorderSig] = useState('');
  const [recorderName, setRecorderName] = useState('');
  const [linkedJobId, setLinkedJobId] = useState<string | null>(null);
  const [linkedJobTitle, setLinkedJobTitle] = useState<string | null>(null);

  const { data: activePermits = [] } = useActivePermits();
  const { data: approvedRams = [] } = useRAMSDocumentsByStatus('approved');
  const { projects: jobs = [] } = useSparkProjects('active');
  const jobTitleFor = (id: string | null) =>
    id ? (jobs.find((j) => j.id === id)?.title ?? null) : null;

  const {
    status: draftStatus,
    recoveredData: recoveredDraft,
    clearDraft,
    dismissRecovery: dismissDraft,
  } = useLocalDraft({
    key: 'site-diary',
    data: {
      siteName: validation.fields.siteName?.value ?? '',
      siteAddress,
      weather,
      startTime,
      endTime,
      personnelCount,
      workCompleted,
      issues,
      materialsUsed,
      notes,
      recorderName,
      selectedRamsIds,
      selectedPermitIds,
    },
    enabled: showForm,
  });

  const restoreDraft = () => {
    if (!recoveredDraft) return;
    if (recoveredDraft.siteName) validation.setValue('siteName', recoveredDraft.siteName);
    if (recoveredDraft.siteAddress) setSiteAddress(recoveredDraft.siteAddress);
    if (recoveredDraft.weather) setWeather(recoveredDraft.weather);
    if (recoveredDraft.startTime) setStartTime(recoveredDraft.startTime);
    if (recoveredDraft.endTime) setEndTime(recoveredDraft.endTime);
    if (recoveredDraft.personnelCount) setPersonnelCount(recoveredDraft.personnelCount);
    if (recoveredDraft.workCompleted) setWorkCompleted(recoveredDraft.workCompleted);
    if (recoveredDraft.issues) setIssues(recoveredDraft.issues);
    if (recoveredDraft.materialsUsed) setMaterialsUsed(recoveredDraft.materialsUsed);
    if (recoveredDraft.notes) setNotes(recoveredDraft.notes);
    if (recoveredDraft.recorderName) setRecorderName(recoveredDraft.recorderName);
    if (recoveredDraft.selectedRamsIds?.length) setSelectedRamsIds(recoveredDraft.selectedRamsIds);
    if (recoveredDraft.selectedPermitIds?.length)
      setSelectedPermitIds(recoveredDraft.selectedPermitIds);
    dismissDraft();
  };

  const { data: entries = [], isLoading, refetch } = useElectricianSiteDiary();
  const createEntry = useCreateDiaryEntry();
  const deleteEntry = useDeleteDiaryEntry();

  const calendarDays = useMemo(() => generateCalendarDays(today), [today]);
  const selectedDateKey = formatDateKey(selectedDate);
  const entriesForDate = entries.filter((e: SiteDiaryEntry) => e.entry_date === selectedDateKey);

  const filteredEntriesForDate = useMemo(() => {
    if (!searchQuery) return entriesForDate;
    const q = searchQuery.toLowerCase();
    return entriesForDate.filter(
      (entry) =>
        entry.site_name?.toLowerCase().includes(q) ||
        entry.work_completed?.toLowerCase().includes(q) ||
        entry.issues?.toLowerCase().includes(q) ||
        entry.notes?.toLowerCase().includes(q) ||
        entry.site_address?.toLowerCase().includes(q)
    );
  }, [entriesForDate, searchQuery]);

  const resetForm = () => {
    validation.reset();
    setSiteAddress('');
    setWeather('');
    setStartTime('');
    setEndTime('');
    setPersonnelCount('');
    setWorkCompleted('');
    setIssues('');
    setMaterialsUsed('');
    setNotes('');
    setDiaryPhotos([]);
    setSelectedRamsIds([]);
    setSelectedPermitIds([]);
    setRecorderSig('');
    setRecorderName('');
    setLinkedJobId(null);
    setLinkedJobTitle(null);
    clearDraft();
  };

  const handleDuplicate = (entry: SiteDiaryEntry) => {
    if (entry.site_name) validation.setValue('siteName', entry.site_name);
    setSiteAddress(entry.site_address || '');
    setWeather(entry.weather || '');
    setPersonnelCount(entry.personnel_count != null ? String(entry.personnel_count) : '');
    setSelectedRamsIds(entry.rams_ids ?? []);
    setSelectedPermitIds(entry.permit_ids ?? []);
    setLinkedJobId(entry.job_id ?? null);
    setLinkedJobTitle(jobTitleFor(entry.job_id ?? null));
    setStartTime('');
    setEndTime('');
    setWorkCompleted('');
    setIssues('');
    setMaterialsUsed('');
    setNotes('');
    setDiaryPhotos([]);
    setShowForm(true);
    haptic.success();
  };

  const timeValid = !(startTime && endTime && endTime <= startTime);

  /**
   * `electrician_site_diary` carries UNIQUE (user_id, entry_date, site_name).
   *
   * Nothing checked it, so a second entry for the same site on the same day —
   * which "Duplicate" produces by design, since it copies the site name — came
   * back as a bare "Could not save diary entry" with no clue what was wrong.
   * Caught here, where the fix (rename or change the day) can be described.
   */
  const siteNameValue = (validation.fields.siteName?.value ?? '').trim();
  const duplicateEntry =
    siteNameValue.length > 0 &&
    entries.some(
      (e: SiteDiaryEntry) => e.entry_date === selectedDateKey && e.site_name === siteNameValue
    );

  const canSubmit = validation.isValid && timeValid && !duplicateEntry;

  const handleSubmit = async () => {
    if (!validation.validateAll()) return;
    if (startTime && endTime && endTime <= startTime) return;
    if (duplicateEntry) return;
    await createEntry.mutateAsync({
      entry_date: selectedDateKey,
      site_name: validation.fields.siteName.value.trim(),
      site_address: siteAddress.trim() || null,
      weather: weather || null,
      start_time: startTime || null,
      end_time: endTime || null,
      personnel_count: personnelCount ? parseInt(personnelCount, 10) : null,
      work_completed: workCompleted.trim() || null,
      issues: issues.trim() || null,
      delays: null,
      materials_used: materialsUsed.trim() || null,
      photos: diaryPhotos.length > 0 ? diaryPhotos : [],
      rams_ids: selectedRamsIds,
      permit_ids: selectedPermitIds,
      notes: notes.trim() || null,
      recorder_signature: recorderSig || null,
      // Was hard-coded null while the column exists and the PDF prints it: the
      // signature had no name against it on any entry ever recorded.
      recorder_name: recorderName.trim() || null,
      job_id: linkedJobId,
    });
    haptic.success();
    resetForm();
    setShowForm(false);
  };

  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const scrollCalendar = (direction: 'left' | 'right') => {
    if (calendarRef.current)
      calendarRef.current.scrollBy({ left: direction === 'left' ? -200 : 200, behavior: 'smooth' });
  };

  return (
    // Site Safety's page step is hsl(0 0% 7%), not pure black — the ladder the
    // shared module shell sets. `bg-elec-dark` (#000) made the diary a shade
    // darker than every screen it sits beside.
    <div className="min-h-screen bg-[hsl(0_0%_7%)] pb-28">
      <SafetyMasthead
        onBack={onBack}
        moduleName="Site Diary"
        trailing={showForm ? <DraftSaveIndicator status={draftStatus} /> : undefined}
      />

      {/* Calendar strip */}
      <div className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-3xl px-2 py-3 flex items-center gap-1">
          <button
            onClick={() => scrollCalendar('left')}
            className="flex h-11 w-11 touch-manipulation items-center justify-center text-white active:scale-[0.99] active:brightness-125"
            aria-label="Earlier"
          >
            ‹
          </button>
          <div
            ref={calendarRef}
            className="flex gap-2 overflow-x-auto hide-scrollbar flex-1"
            style={{ scrollbarWidth: 'none' }}
          >
            {calendarDays.map((day) => {
              const isSelected = isSameDay(day, selectedDate);
              const isToday = isSameDay(day, today);
              const hasEntries = entries.some(
                (e: SiteDiaryEntry) => e.entry_date === formatDateKey(day)
              );
              const isFuture = day > today && !isToday;
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => !isFuture && setSelectedDate(day)}
                  disabled={isFuture}
                  className={cn(
                    'flex h-16 w-12 flex-shrink-0 flex-col items-center justify-center rounded-xl text-center transition-all',
                    // Press brightens rather than dims — a dark cell that dims
                    // under the thumb reads as "disabled", not "pressed".
                    'touch-manipulation active:scale-[0.97] active:brightness-125 [-webkit-tap-highlight-color:transparent]',
                    isFuture
                      ? 'pointer-events-none bg-white/[0.02] text-white opacity-50'
                      : isSelected
                        ? 'bg-elec-yellow font-semibold text-black'
                        : isToday
                          ? 'border border-elec-yellow/40 bg-white/[0.06] text-white'
                          : 'bg-white/[0.04] text-white'
                  )}
                >
                  <span className="text-[10px] font-medium uppercase tracking-[0.08em]">
                    {day.toLocaleDateString('en-GB', { weekday: 'short' })}
                  </span>
                  <span className="text-[17px] font-semibold tabular-nums">{day.getDate()}</span>
                  {hasEntries && (
                    <span
                      className={cn(
                        'w-1.5 h-1.5 rounded-full mt-0.5',
                        isSelected ? 'bg-black' : 'bg-elec-yellow'
                      )}
                    />
                  )}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => scrollCalendar('right')}
            className="flex h-11 w-11 touch-manipulation items-center justify-center text-white active:scale-[0.99] active:brightness-125"
            aria-label="Later"
          >
            ›
          </button>
        </div>
      </div>

      <PullToRefresh onRefresh={handleRefresh}>
        <div className="mx-auto max-w-3xl px-4 py-4">
          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <Eyebrow>New entry</Eyebrow>
                    <h2 className="mt-1 text-[18px] font-semibold text-white">
                      {selectedDate.toLocaleDateString('en-GB', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      })}
                    </h2>
                  </div>
                  <SecondaryButton
                    onClick={() => {
                      resetForm();
                      setShowForm(false);
                    }}
                  >
                    Cancel
                  </SecondaryButton>
                </div>

                <AnimatePresence>
                  {recoveredDraft && (
                    <DraftRecoveryBanner onRestore={restoreDraft} onDismiss={dismissDraft} />
                  )}
                </AnimatePresence>

                <FormCard eyebrow="Site" className={CARD_CN}>
                  <Field label="Site name" required>
                    <input
                      value={validation.fields.siteName?.value ?? ''}
                      onChange={(e) => validation.setValue('siteName', e.target.value)}
                      onBlur={() => validation.setTouched('siteName')}
                      className={safetyInputCn}
                      placeholder="e.g. 14 King Street Refurb"
                    />
                    {validation.fields.siteName?.touched && validation.fields.siteName?.error && (
                      <p className="mt-1 text-[11px] text-red-400">
                        {validation.fields.siteName.error}
                      </p>
                    )}
                    {duplicateEntry && (
                      <p className="mt-1 text-[11px] text-amber-400">
                        There is already an entry for this site on this day. Rename it or pick
                        another day — one entry per site per day.
                      </p>
                    )}
                  </Field>
                  <LocationAutoFill
                    value={siteAddress}
                    onChange={setSiteAddress}
                    label="Site address (optional)"
                    placeholder="Full address"
                  />
                  <Field label="Weather">
                    <div className="flex flex-wrap gap-2">
                      {WEATHER_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setWeather(weather === opt.value ? '' : opt.value)}
                          aria-pressed={weather === opt.value}
                          className={cn(
                            'h-11 rounded-xl border px-4 text-[13px] font-medium transition-all',
                            'touch-manipulation active:scale-[0.97] active:brightness-125 [-webkit-tap-highlight-color:transparent]',
                            weather === opt.value
                              ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                              : 'border-white/[0.12] bg-white/[0.06] text-white'
                          )}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </Field>
                </FormCard>

                <FormCard eyebrow="The day" className={CARD_CN}>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Start time">
                      <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className={cn(safetyInputCn, '[color-scheme:dark]')}
                      />
                    </Field>
                    <Field label="End time">
                      {/* `safetyInputCn` was missing here and present on every
                          other field — this one input rendered as a raw browser
                          time control, boxed and grey, in the middle of the
                          underline form. */}
                      <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className={cn(
                          safetyInputCn,
                          '[color-scheme:dark]',
                          !timeValid && 'border-red-400'
                        )}
                      />
                    </Field>
                  </div>
                  {!timeValid && (
                    <p className="text-[11px] text-red-400">End time must be after start time.</p>
                  )}
                  <Field label="Personnel on site">
                    <input
                      type="number"
                      inputMode="numeric"
                      value={personnelCount}
                      onChange={(e) => setPersonnelCount(e.target.value)}
                      placeholder="Number of people"
                      className={safetyInputCn}
                    />
                  </Field>
                  <Field label="Work completed">
                    <SmartTextarea
                      value={workCompleted}
                      onChange={setWorkCompleted}
                      placeholder="Describe work carried out today…"
                      className={cn(safetyTextareaCn, 'min-h-[110px]')}
                    />
                  </Field>
                  <Field label="Issues (optional)">
                    <SmartTextarea
                      value={issues}
                      onChange={setIssues}
                      placeholder="Any issues or problems encountered…"
                      className={cn(safetyTextareaCn, 'min-h-[80px]')}
                    />
                  </Field>
                  <Field label="Materials used (optional)">
                    <SmartTextarea
                      value={materialsUsed}
                      onChange={setMaterialsUsed}
                      placeholder="List materials used on site…"
                      className={cn(safetyTextareaCn, 'min-h-[80px]')}
                    />
                  </Field>
                  <Field label="Additional notes (optional)">
                    <SmartTextarea
                      value={notes}
                      onChange={setNotes}
                      placeholder="Anything else to record…"
                      className={cn(safetyTextareaCn, 'min-h-[80px]')}
                    />
                  </Field>
                </FormCard>

                {(approvedRams.length > 0 || activePermits.length > 0) && (
                  <FormCard eyebrow="Linked documents" className={CARD_CN}>
                    {approvedRams.length > 0 && (
                      <Field label="RAMS (optional)">
                        {selectedRamsIds.length > 0 && (
                          <div className="mb-2 flex flex-wrap gap-1.5">
                            {selectedRamsIds.map((id) => {
                              const doc = approvedRams.find((r) => r.id === id);
                              const name = doc?.project_name ?? 'RAMS';
                              return (
                                <SelectedChip
                                  key={id}
                                  label={name}
                                  onRemove={() =>
                                    setSelectedRamsIds((prev) => prev.filter((x) => x !== id))
                                  }
                                />
                              );
                            })}
                          </div>
                        )}
                        {/* Only render the picker while something is left to
                            pick — an empty SafetyListCard is a bordered box
                            with nothing in it. */}
                        {approvedRams.some((r) => !selectedRamsIds.includes(r.id)) && (
                          <SafetyListCard>
                            {approvedRams
                              .filter((r) => !selectedRamsIds.includes(r.id))
                              .map((r) => (
                                <SafetyListRow
                                  key={r.id}
                                  onClick={() => setSelectedRamsIds((prev) => [...prev, r.id])}
                                  title={r.project_name}
                                  subtitle={r.location}
                                  trailing={<span className="text-[13px] text-elec-yellow">+</span>}
                                />
                              ))}
                          </SafetyListCard>
                        )}
                      </Field>
                    )}
                    {activePermits.length > 0 && (
                      <Field label="Permits (optional)">
                        {selectedPermitIds.length > 0 && (
                          <div className="mb-2 flex flex-wrap gap-1.5">
                            {selectedPermitIds.map((id) => {
                              const permit = activePermits.find((p) => p.id === id);
                              return (
                                <SelectedChip
                                  key={id}
                                  label={permit?.title ?? 'Permit'}
                                  onRemove={() =>
                                    setSelectedPermitIds((prev) => prev.filter((x) => x !== id))
                                  }
                                />
                              );
                            })}
                          </div>
                        )}
                        {activePermits.some((p) => !selectedPermitIds.includes(p.id)) && (
                          <SafetyListCard>
                            {activePermits
                              .filter((p) => !selectedPermitIds.includes(p.id))
                              .map((p) => (
                                <SafetyListRow
                                  key={p.id}
                                  onClick={() => setSelectedPermitIds((prev) => [...prev, p.id])}
                                  title={p.title}
                                  subtitle={`${p.location} · ${new Date(p.end_time).toLocaleDateString('en-GB')}`}
                                  trailing={<span className="text-[13px] text-elec-yellow">+</span>}
                                />
                              ))}
                          </SafetyListCard>
                        )}
                      </Field>
                    )}
                  </FormCard>
                )}

                <FormCard eyebrow="Project" className={CARD_CN}>
                  <JobLinkField
                    jobId={linkedJobId}
                    jobTitle={linkedJobTitle}
                    onSelect={(id, title) => {
                      setLinkedJobId(id);
                      setLinkedJobTitle(title);
                    }}
                  />
                </FormCard>

                <FormCard eyebrow="Evidence & sign-off" className={CARD_CN}>
                  <SafetyPhotoCapture
                    photos={diaryPhotos}
                    onPhotosChange={setDiaryPhotos}
                    maxPhotos={5}
                    label="Site photos"
                  />
                  <Field label="Recorder name">
                    <input
                      value={recorderName}
                      onChange={(e) => setRecorderName(e.target.value)}
                      placeholder="Who is recording this entry"
                      className={safetyInputCn}
                    />
                  </Field>
                  <SignatureField
                    label="Recorder signature"
                    value={recorderSig}
                    onChange={setRecorderSig}
                  />
                </FormCard>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <Eyebrow>{isSameDay(selectedDate, today) ? 'Today' : 'Selected day'}</Eyebrow>
                    <h2 className="mt-1 text-[18px] font-semibold text-white">
                      {selectedDate.toLocaleDateString('en-GB', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      })}
                    </h2>
                  </div>
                  <PrimaryButton onClick={() => setShowForm(true)}>New entry</PrimaryButton>
                </div>

                {entriesForDate.length > 0 && (
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search entries…"
                    className={cn(safetyInputCn, 'rounded-full')}
                  />
                )}

                {isLoading ? (
                  <LoadingState />
                ) : entriesForDate.length === 0 ? (
                  <EmptyState
                    title="No entries for this day"
                    description="Log your site activity for this day — a daily record for compliance and evidence."
                    action="New entry"
                    onAction={() => setShowForm(true)}
                  />
                ) : filteredEntriesForDate.length === 0 ? (
                  <EmptyState
                    title="No matching entries"
                    description="Try a different search term."
                  />
                ) : (
                  <div className="space-y-2.5">
                    {filteredEntriesForDate.map((entry: SiteDiaryEntry) => {
                      const meta: string[] = [];
                      if (entry.weather) meta.push(entry.weather);
                      if (entry.start_time || entry.end_time)
                        meta.push(`${entry.start_time ?? '?'}–${entry.end_time ?? '?'}`);
                      if (entry.personnel_count != null)
                        meta.push(`${entry.personnel_count} on site`);
                      const linkedJob = jobTitleFor(entry.job_id);
                      if (linkedJob) meta.push(linkedJob);
                      return (
                        <SwipeableListItem
                          key={entry.id}
                          leftActions={[
                            {
                              icon: Copy,
                              label: 'Duplicate',
                              color: 'bg-blue-500',
                              textColor: 'text-white',
                              onAction: () => handleDuplicate(entry),
                            },
                          ]}
                          rightActions={[
                            {
                              icon: Trash2,
                              label: 'Delete',
                              color: 'bg-red-500',
                              textColor: 'text-white',
                              onAction: () => setDeleteTarget(entry.id),
                            },
                          ]}
                        >
                          <SafetyListCard>
                            <SafetyListRow
                              accent="blue"
                              onClick={() => {
                                setShareRecordId(entry.id);
                                setShareRecordTitle(entry.site_name);
                              }}
                              title={entry.site_name}
                              subtitle={
                                entry.work_completed?.substring(0, 70) || (entry.site_address ?? '')
                              }
                              trailing={
                                <div className="flex flex-col items-end gap-1">
                                  {/* Neutral surface, plain white text — the
                                      Document Hub's convention for "done,
                                      nothing outstanding". A blue wash on
                                      near-black muddies and reads as a state
                                      that needs attention. */}
                                  <span className="inline-flex items-center whitespace-nowrap rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white">
                                    Recorded
                                  </span>
                                  {meta.length > 0 && (
                                    <span className="text-[11px] text-white">
                                      {meta.join(' · ')}
                                    </span>
                                  )}
                                </div>
                              }
                            />
                          </SafetyListCard>
                        </SwipeableListItem>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PullToRefresh>

      {/* Sticky submit (form mode) */}
      {showForm && (
        <div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-[hsl(0_0%_7%)]/95 px-4 py-3 backdrop-blur-sm"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        >
          <div className="mx-auto max-w-3xl">
            <PrimaryButton
              fullWidth
              size="lg"
              disabled={!canSubmit || createEntry.isPending}
              onClick={handleSubmit}
            >
              {createEntry.isPending ? 'Saving…' : 'Save entry'}
            </PrimaryButton>
          </div>
        </div>
      )}

      <DeleteConfirmSheet
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        onConfirm={() => {
          if (deleteTarget) deleteEntry.mutate(deleteTarget);
          setDeleteTarget(null);
        }}
        title="Delete diary entry?"
        description="This entry will be permanently removed"
        isDeleting={deleteEntry.isPending}
      />

      {shareRecordId && (
        <SafetyDocumentShare
          open={!!shareRecordId}
          onClose={() => setShareRecordId(null)}
          pdfType="site-diary"
          recordId={shareRecordId}
          documentTitle={`Site Diary — ${shareRecordTitle}`}
        />
      )}
    </div>
  );
}

export default ElectricianSiteDiary;
