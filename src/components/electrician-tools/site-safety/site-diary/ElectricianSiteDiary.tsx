import { useState, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
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
  ListCard,
  ListRow,
  EmptyState,
  LoadingState,
  PrimaryButton,
  SecondaryButton,
  inputClass,
} from '@/components/college/primitives';
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

interface ElectricianSiteDiaryProps {
  onBack: () => void;
}

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
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function formatDateKey(d: Date): string {
  return d.toISOString().split('T')[0];
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

  const validation = useFieldValidation({ siteName: { required: true, message: 'Site name is required' } });

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
  const [linkedJobId, setLinkedJobId] = useState<string | null>(null);
  const [linkedJobTitle, setLinkedJobTitle] = useState<string | null>(null);

  const { data: activePermits = [] } = useActivePermits();
  const { data: approvedRams = [] } = useRAMSDocumentsByStatus('approved');
  const { data: jobs = [] } = useSparkProjects('active');
  const jobTitleFor = (id: string | null) => (id ? jobs.find((j) => j.id === id)?.title ?? null : null);

  const { status: draftStatus, recoveredData: recoveredDraft, clearDraft, dismissRecovery: dismissDraft } = useLocalDraft({
    key: 'site-diary',
    data: {
      siteName: validation.fields.siteName?.value ?? '',
      siteAddress, weather, startTime, endTime, personnelCount, workCompleted, issues, materialsUsed, notes, selectedRamsIds, selectedPermitIds,
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
    if (recoveredDraft.selectedRamsIds?.length) setSelectedRamsIds(recoveredDraft.selectedRamsIds);
    if (recoveredDraft.selectedPermitIds?.length) setSelectedPermitIds(recoveredDraft.selectedPermitIds);
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
    setSiteAddress(''); setWeather(''); setStartTime(''); setEndTime(''); setPersonnelCount('');
    setWorkCompleted(''); setIssues(''); setMaterialsUsed(''); setNotes(''); setDiaryPhotos([]);
    setSelectedRamsIds([]); setSelectedPermitIds([]); setRecorderSig('');
    setLinkedJobId(null); setLinkedJobTitle(null);
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
    setStartTime(''); setEndTime(''); setWorkCompleted(''); setIssues(''); setMaterialsUsed(''); setNotes(''); setDiaryPhotos([]);
    setShowForm(true);
    haptic.success();
  };

  const timeValid = !(startTime && endTime && endTime <= startTime);
  const canSubmit = validation.isValid && timeValid;

  const handleSubmit = async () => {
    if (!validation.validateAll()) return;
    if (startTime && endTime && endTime <= startTime) return;
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
      recorder_name: null,
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
    if (calendarRef.current) calendarRef.current.scrollBy({ left: direction === 'left' ? -200 : 200, behavior: 'smooth' });
  };

  return (
    <div className="bg-elec-dark min-h-screen pb-28">
      <SafetyMasthead
        onBack={onBack}
        moduleName="Site Diary"
        trailing={showForm ? <DraftSaveIndicator status={draftStatus} /> : undefined}
      />

      {/* Calendar strip */}
      <div className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-3xl px-2 py-3 flex items-center gap-1">
          <button onClick={() => scrollCalendar('left')} className="h-11 w-8 flex items-center justify-center text-white/50 touch-manipulation" aria-label="Earlier">
            ‹
          </button>
          <div ref={calendarRef} className="flex gap-2 overflow-x-auto hide-scrollbar flex-1" style={{ scrollbarWidth: 'none' }}>
            {calendarDays.map((day) => {
              const isSelected = isSameDay(day, selectedDate);
              const isToday = isSameDay(day, today);
              const hasEntries = entries.some((e: SiteDiaryEntry) => e.entry_date === formatDateKey(day));
              const isFuture = day > today && !isToday;
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => !isFuture && setSelectedDate(day)}
                  disabled={isFuture}
                  className={cn(
                    'flex-shrink-0 w-12 h-16 flex flex-col items-center justify-center rounded-xl text-center touch-manipulation active:scale-95 transition-all',
                    isFuture
                      ? 'bg-white/[0.02] text-white/30 pointer-events-none'
                      : isSelected
                        ? 'bg-elec-yellow text-black'
                        : isToday
                          ? 'bg-white/[0.06] text-white border border-elec-yellow/40'
                          : 'bg-white/[0.04] text-white'
                  )}
                >
                  <span className="text-[10px] font-medium uppercase tracking-[0.08em]">{day.toLocaleDateString('en-GB', { weekday: 'short' })}</span>
                  <span className="text-[17px] font-semibold tabular-nums">{day.getDate()}</span>
                  {hasEntries && <span className={cn('w-1.5 h-1.5 rounded-full mt-0.5', isSelected ? 'bg-black' : 'bg-elec-yellow')} />}
                </button>
              );
            })}
          </div>
          <button onClick={() => scrollCalendar('right')} className="h-11 w-8 flex items-center justify-center text-white/50 touch-manipulation" aria-label="Later">
            ›
          </button>
        </div>
      </div>

      <PullToRefresh onRefresh={handleRefresh}>
        <div className="mx-auto max-w-3xl px-4 py-4">
          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div key="form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.2 }} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Eyebrow>New entry</Eyebrow>
                    <h2 className="mt-1 text-[18px] font-semibold text-white">
                      {selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </h2>
                  </div>
                  <SecondaryButton onClick={() => { resetForm(); setShowForm(false); }}>Cancel</SecondaryButton>
                </div>

                <AnimatePresence>
                  {recoveredDraft && <DraftRecoveryBanner onRestore={restoreDraft} onDismiss={dismissDraft} />}
                </AnimatePresence>

                <FormCard eyebrow="Site">
                  <Field label="Site name" required>
                    <input
                      value={validation.fields.siteName?.value ?? ''}
                      onChange={(e) => validation.setValue('siteName', e.target.value)}
                      onBlur={() => validation.setTouched('siteName')}
                      className={inputClass}
                      placeholder="e.g. 14 King Street Refurb"
                    />
                    {validation.fields.siteName?.touched && validation.fields.siteName?.error && (
                      <p className="text-[11px] text-red-400 mt-1">{validation.fields.siteName.error}</p>
                    )}
                  </Field>
                  <LocationAutoFill value={siteAddress} onChange={setSiteAddress} label="Site address (optional)" placeholder="Full address" />
                  <Field label="Weather">
                    <div className="flex gap-2 flex-wrap">
                      {WEATHER_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setWeather(weather === opt.value ? '' : opt.value)}
                          className={cn(
                            'h-10 px-4 rounded-xl text-[13px] font-medium touch-manipulation active:scale-95 transition-all border',
                            weather === opt.value ? 'bg-elec-yellow text-black border-elec-yellow' : 'bg-[hsl(0_0%_10%)] text-white border-white/[0.08]'
                          )}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </Field>
                </FormCard>

                <FormCard eyebrow="The day">
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Start time">
                      <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className={cn(inputClass, '[color-scheme:dark]')} />
                    </Field>
                    <Field label="End time">
                      <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className={cn(inputClass, '[color-scheme:dark]', !timeValid && 'border-red-500/60')} />
                    </Field>
                  </div>
                  {!timeValid && <p className="text-[11px] text-red-400">End time must be after start time.</p>}
                  <Field label="Personnel on site">
                    <input type="number" inputMode="numeric" value={personnelCount} onChange={(e) => setPersonnelCount(e.target.value)} placeholder="Number of people" className={inputClass} />
                  </Field>
                  <Field label="Work completed">
                    <SmartTextarea value={workCompleted} onChange={setWorkCompleted} placeholder="Describe work carried out today…" className="min-h-[110px] text-[13px] resize-none bg-[hsl(0_0%_9%)] border-white/[0.08] focus:border-elec-yellow/60 rounded-xl" />
                  </Field>
                  <Field label="Issues (optional)">
                    <SmartTextarea value={issues} onChange={setIssues} placeholder="Any issues or problems encountered…" className="min-h-[80px] text-[13px] resize-none bg-[hsl(0_0%_9%)] border-white/[0.08] focus:border-elec-yellow/60 rounded-xl" />
                  </Field>
                  <Field label="Materials used (optional)">
                    <SmartTextarea value={materialsUsed} onChange={setMaterialsUsed} placeholder="List materials used on site…" className="min-h-[80px] text-[13px] resize-none bg-[hsl(0_0%_9%)] border-white/[0.08] focus:border-elec-yellow/60 rounded-xl" />
                  </Field>
                  <Field label="Additional notes (optional)">
                    <SmartTextarea value={notes} onChange={setNotes} placeholder="Anything else to record…" className="min-h-[80px] text-[13px] resize-none bg-[hsl(0_0%_9%)] border-white/[0.08] focus:border-elec-yellow/60 rounded-xl" />
                  </Field>
                </FormCard>

                {(approvedRams.length > 0 || activePermits.length > 0) && (
                  <FormCard eyebrow="Linked documents">
                    {approvedRams.length > 0 && (
                      <Field label="RAMS (optional)">
                        {selectedRamsIds.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {selectedRamsIds.map((id) => {
                              const doc = approvedRams.find((r) => r.id === id);
                              return (
                                <span key={id} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11.5px] text-white/80 bg-white/[0.05] border border-white/10">
                                  {doc?.project_name ?? 'RAMS'}
                                  <button onClick={() => setSelectedRamsIds((prev) => prev.filter((x) => x !== id))} className="text-white/50 hover:text-white" aria-label="Remove">×</button>
                                </span>
                              );
                            })}
                          </div>
                        )}
                        <ListCard>
                          {approvedRams.filter((r) => !selectedRamsIds.includes(r.id)).map((r) => (
                            <ListRow key={r.id} onClick={() => setSelectedRamsIds((prev) => [...prev, r.id])} title={r.project_name} subtitle={r.location} trailing={<span className="text-elec-yellow/70 text-[13px]">+</span>} />
                          ))}
                        </ListCard>
                      </Field>
                    )}
                    {activePermits.length > 0 && (
                      <Field label="Permits (optional)">
                        {selectedPermitIds.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {selectedPermitIds.map((id) => {
                              const permit = activePermits.find((p) => p.id === id);
                              return (
                                <span key={id} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11.5px] text-white/80 bg-white/[0.05] border border-white/10">
                                  {permit?.title ?? 'Permit'}
                                  <button onClick={() => setSelectedPermitIds((prev) => prev.filter((x) => x !== id))} className="text-white/50 hover:text-white" aria-label="Remove">×</button>
                                </span>
                              );
                            })}
                          </div>
                        )}
                        <ListCard>
                          {activePermits.filter((p) => !selectedPermitIds.includes(p.id)).map((p) => (
                            <ListRow key={p.id} onClick={() => setSelectedPermitIds((prev) => [...prev, p.id])} title={p.title} subtitle={`${p.location} · ${new Date(p.end_time).toLocaleDateString('en-GB')}`} trailing={<span className="text-elec-yellow/70 text-[13px]">+</span>} />
                          ))}
                        </ListCard>
                      </Field>
                    )}
                  </FormCard>
                )}

                <FormCard eyebrow="Project">
                  <JobLinkField
                    jobId={linkedJobId}
                    jobTitle={linkedJobTitle}
                    onSelect={(id, title) => {
                      setLinkedJobId(id);
                      setLinkedJobTitle(title);
                    }}
                  />
                </FormCard>

                <FormCard eyebrow="Evidence & sign-off">
                  <SafetyPhotoCapture photos={diaryPhotos} onPhotosChange={setDiaryPhotos} maxPhotos={5} label="Site photos" />
                  <SignatureField label="Recorder signature" value={recorderSig} onChange={setRecorderSig} />
                </FormCard>
              </motion.div>
            ) : (
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <Eyebrow>{isSameDay(selectedDate, today) ? 'Today' : 'Selected day'}</Eyebrow>
                    <h2 className="mt-1 text-[18px] font-semibold text-white">
                      {selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </h2>
                  </div>
                  <PrimaryButton onClick={() => setShowForm(true)}>New entry</PrimaryButton>
                </div>

                {entriesForDate.length > 0 && (
                  <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search entries…" className={cn(inputClass, 'rounded-full')} />
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
                  <EmptyState title="No matching entries" description="Try a different search term." />
                ) : (
                  <div className="space-y-2.5">
                    {filteredEntriesForDate.map((entry: SiteDiaryEntry) => {
                      const meta: string[] = [];
                      if (entry.weather) meta.push(entry.weather);
                      if (entry.start_time || entry.end_time) meta.push(`${entry.start_time ?? '?'}–${entry.end_time ?? '?'}`);
                      if (entry.personnel_count != null) meta.push(`${entry.personnel_count} on site`);
                      const linkedJob = jobTitleFor(entry.job_id);
                      if (linkedJob) meta.push(linkedJob);
                      return (
                        <SwipeableListItem
                          key={entry.id}
                          leftActions={[{ icon: Copy, label: 'Duplicate', color: 'bg-blue-500', textColor: 'text-white', onAction: () => handleDuplicate(entry) }]}
                          rightActions={[{ icon: Trash2, label: 'Delete', color: 'bg-red-500', textColor: 'text-white', onAction: () => setDeleteTarget(entry.id) }]}
                        >
                          <ListCard>
                            <ListRow
                              accent="blue"
                              onClick={() => { setShareRecordId(entry.id); setShareRecordTitle(entry.site_name); }}
                              title={entry.site_name}
                              subtitle={entry.work_completed?.substring(0, 70) || (entry.site_address ?? '')}
                              trailing={
                                <div className="flex flex-col items-end gap-1">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border bg-blue-500/10 text-blue-400 border-blue-500/25">Recorded</span>
                                  {meta.length > 0 && <span className="text-[11px] text-white/45">{meta.join(' · ')}</span>}
                                </div>
                              }
                            />
                          </ListCard>
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
        <div className="fixed bottom-0 inset-x-0 bg-elec-dark/95 backdrop-blur-sm border-t border-white/[0.06] px-4 py-3 z-40" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
          <div className="mx-auto max-w-3xl">
            <PrimaryButton fullWidth size="lg" disabled={!canSubmit || createEntry.isPending} onClick={handleSubmit}>
              {createEntry.isPending ? 'Saving…' : 'Save entry'}
            </PrimaryButton>
          </div>
        </div>
      )}

      <DeleteConfirmSheet
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
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
