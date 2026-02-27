import React, { useState, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { SmartTextarea } from '../common/SmartTextarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  BookOpen,
  Plus,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Wind,
  Clock,
  MapPin,
  Users,
  Loader2,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Trash2,
  Copy,
  FileText,
  Shield,
  CheckCircle2,
} from 'lucide-react';
import {
  useElectricianSiteDiary,
  useCreateDiaryEntry,
  useDeleteDiaryEntry,
  type SiteDiaryEntry,
} from '@/hooks/useElectricianSiteDiary';
import { useActivePermits } from '@/hooks/usePermitsToWork';
import { useRAMSDocumentsByStatus } from '@/hooks/useRAMSDocuments';
import { SafetyPhotoCapture } from '../common/SafetyPhotoCapture';
import { SafetyEmptyState } from '../common/SafetyEmptyState';
import { SafetySkeletonLoader } from '../common/SafetySkeletonLoader';
import { SwipeableListItem } from '../common/SwipeableListItem';
import { useHaptic } from '@/hooks/useHaptic';
import { useFieldValidation } from '@/hooks/useFieldValidation';
import { ValidatedField } from '../common/ValidatedField';
import { useLocalDraft } from '@/hooks/useLocalDraft';
import { DraftRecoveryBanner } from '../common/DraftRecoveryBanner';
import { DraftSaveIndicator } from '../common/DraftSaveIndicator';
import { LocationAutoFill } from '../common/LocationAutoFill';
import { DeleteConfirmSheet } from '../common/DeleteConfirmSheet';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { SignaturePad } from '../common/SignaturePad';

interface ElectricianSiteDiaryProps {
  onBack: () => void;
}

const WEATHER_OPTIONS = [
  { value: 'sunny', label: 'Sunny', icon: Sun },
  { value: 'cloudy', label: 'Cloudy', icon: Cloud },
  { value: 'rain', label: 'Rain', icon: CloudRain },
  { value: 'snow', label: 'Snow', icon: CloudSnow },
  { value: 'windy', label: 'Windy', icon: Wind },
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

function formatDateKey(d: Date): string {
  return d.toISOString().split('T')[0];
}

export function ElectricianSiteDiary({ onBack }: ElectricianSiteDiaryProps) {
  const haptic = useHaptic();
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();
  const today = useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = useState(today);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Validation for required fields
  const validation = useFieldValidation({
    siteName: { required: true, message: 'Site name is required' },
  });

  // Form state
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

  // Recorder signature state
  const [recorderSigName, setRecorderSigName] = useState('');
  const [recorderSigDate, setRecorderSigDate] = useState('');
  const [recorderSigDataUrl, setRecorderSigDataUrl] = useState('');

  // Linked data sources
  const { data: activePermits = [] } = useActivePermits();
  const { data: approvedRams = [] } = useRAMSDocumentsByStatus('approved');

  // Draft persistence
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
    setRecorderSigName('');
    setRecorderSigDate('');
    setRecorderSigDataUrl('');
    clearDraft();
  };

  const handleDuplicate = (entry: SiteDiaryEntry) => {
    // Copy site details, clear date-specific fields
    if (entry.site_name) validation.setValue('siteName', entry.site_name);
    setSiteAddress(entry.site_address || '');
    setWeather(entry.weather || '');
    setPersonnelCount(entry.personnel_count != null ? String(entry.personnel_count) : '');
    // Carry forward linked RAMS/permits
    setSelectedRamsIds(entry.rams_ids ?? []);
    setSelectedPermitIds(entry.permit_ids ?? []);
    // Clear date-specific fields
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
      recorder_signature: recorderSigDataUrl || null,
      recorder_name: recorderSigName || null,
    });

    haptic.success();
    resetForm();
    setShowForm(false);
  };

  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const scrollCalendar = (direction: 'left' | 'right') => {
    if (calendarRef.current) {
      const amount = direction === 'left' ? -200 : 200;
      calendarRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
        <button
          onClick={onBack}
          className="h-11 w-11 flex items-center justify-center rounded-xl touch-manipulation active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-white">Site Diary</h1>
          <p className="text-sm text-white">Record daily site activity</p>
        </div>
        <BookOpen className="w-5 h-5 text-elec-yellow" />
      </div>

      {/* Calendar Strip */}
      <div className="border-b border-white/10 px-2 py-3">
        <div className="flex items-center gap-1">
          <button
            onClick={() => scrollCalendar('left')}
            className="h-11 w-8 flex items-center justify-center touch-manipulation active:scale-90 transition-transform flex-shrink-0"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <div
            ref={calendarRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide flex-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
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
                  className={`flex-shrink-0 w-12 h-16 flex flex-col items-center justify-center rounded-xl text-center touch-manipulation active:scale-95 transition-all ${
                    isFuture
                      ? 'bg-white/[0.02] text-white pointer-events-none'
                      : isSelected
                        ? 'bg-elec-yellow text-black'
                        : isToday
                          ? 'bg-white/10 text-white border border-elec-yellow/50'
                          : 'bg-white/5 text-white'
                  }`}
                >
                  <span className="text-[10px] font-medium uppercase">
                    {day.toLocaleDateString('en-GB', { weekday: 'short' })}
                  </span>
                  <span className="text-lg font-bold">{day.getDate()}</span>
                  {hasEntries && (
                    <div
                      className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                        isSelected ? 'bg-black' : 'bg-elec-yellow'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => scrollCalendar('right')}
            className="h-11 w-8 flex items-center justify-center touch-manipulation active:scale-90 transition-transform flex-shrink-0"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <PullToRefresh onRefresh={handleRefresh}>
        <div className="flex-1 overflow-y-auto pb-24">
          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="px-4 pt-4 space-y-4"
              >
                {/* Form Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-semibold text-white">
                      New Entry -{' '}
                      {selectedDate.toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </h2>
                    <DraftSaveIndicator status={draftStatus} />
                  </div>
                  <button
                    onClick={() => {
                      resetForm();
                      setShowForm(false);
                    }}
                    className="h-11 w-11 flex items-center justify-center rounded-xl touch-manipulation active:scale-95 transition-transform"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                <AnimatePresence>
                  {recoveredDraft && (
                    <DraftRecoveryBanner onRestore={restoreDraft} onDismiss={dismissDraft} />
                  )}
                </AnimatePresence>

                {/* Site Name */}
                <ValidatedField
                  name="siteName"
                  label="Site Name"
                  required
                  validation={validation}
                  placeholder="e.g. 14 King Street Refurb"
                />

                {/* Site Address */}
                <LocationAutoFill
                  value={siteAddress}
                  onChange={setSiteAddress}
                  label="Site Address (optional)"
                  placeholder="Full address"
                />

                {/* Weather */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Weather</label>
                  <div className="flex gap-2 flex-wrap">
                    {WEATHER_OPTIONS.map((opt) => {
                      const Icon = opt.icon;
                      const isSelected = weather === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setWeather(opt.value)}
                          className={`h-11 px-4 rounded-xl flex items-center gap-2 text-sm font-medium touch-manipulation active:scale-95 transition-all border ${
                            isSelected
                              ? 'bg-elec-yellow text-black border-elec-yellow'
                              : 'bg-white/5 text-white border-white/10'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Times */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Start Time</label>
                    <Input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">End Time</label>
                    <Input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className={`h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 ${startTime && endTime && endTime <= startTime ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    />
                  </div>
                </div>
                {startTime && endTime && endTime <= startTime && (
                  <p className="text-xs text-red-400 -mt-1 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-400 rounded-full" />
                    End time must be after start time
                  </p>
                )}

                {/* Personnel Count */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Personnel on Site
                  </label>
                  <Input
                    type="number"
                    inputMode="numeric"
                    value={personnelCount}
                    onChange={(e) => setPersonnelCount(e.target.value)}
                    placeholder="Number of people"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>

                {/* Work Completed */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Work Completed
                  </label>
                  <SmartTextarea
                    value={workCompleted}
                    onChange={setWorkCompleted}
                    placeholder="Describe work carried out today..."
                    className="touch-manipulation text-base min-h-[120px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
                  />
                </div>

                {/* Issues */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Issues (optional)
                  </label>
                  <SmartTextarea
                    value={issues}
                    onChange={setIssues}
                    placeholder="Any issues or problems encountered..."
                    className="touch-manipulation text-base min-h-[80px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
                  />
                </div>

                {/* Materials Used */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Materials Used (optional)
                  </label>
                  <SmartTextarea
                    value={materialsUsed}
                    onChange={setMaterialsUsed}
                    placeholder="List materials used on site..."
                    className="touch-manipulation text-base min-h-[80px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Additional Notes (optional)
                  </label>
                  <SmartTextarea
                    value={notes}
                    onChange={setNotes}
                    placeholder="Anything else to record..."
                    className="touch-manipulation text-base min-h-[80px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
                  />
                </div>

                {/* Linked RAMS */}
                {approvedRams.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-elec-yellow" />
                      Link RAMS (Optional)
                    </label>
                    {selectedRamsIds.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {selectedRamsIds.map((id) => {
                          const doc = approvedRams.find((r) => r.id === id);
                          return (
                            <Badge
                              key={id}
                              className="bg-cyan-500/15 text-cyan-300 border-cyan-500/20 text-xs pl-2 pr-1 py-1 flex items-center gap-1"
                            >
                              {doc?.project_name ?? 'RAMS'}
                              <button
                                onClick={() =>
                                  setSelectedRamsIds((prev) => prev.filter((x) => x !== id))
                                }
                                className="ml-0.5 p-0.5 rounded-full hover:bg-white/10 touch-manipulation"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          );
                        })}
                      </div>
                    )}
                    <div className="space-y-1.5 max-h-40 overflow-y-auto">
                      {approvedRams
                        .filter((r) => !selectedRamsIds.includes(r.id))
                        .map((r) => (
                          <button
                            key={r.id}
                            onClick={() => setSelectedRamsIds((prev) => [...prev, r.id])}
                            className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-left touch-manipulation active:scale-[0.99] transition-all"
                          >
                            <Shield className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white truncate">
                                {r.project_name}
                              </p>
                              <p className="text-xs text-white truncate">{r.location}</p>
                            </div>
                            <CheckCircle2 className="h-4 w-4 text-white flex-shrink-0" />
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                {/* Linked Permits */}
                {activePermits.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-elec-yellow" />
                      Link Permits (Optional)
                    </label>
                    {selectedPermitIds.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {selectedPermitIds.map((id) => {
                          const permit = activePermits.find((p) => p.id === id);
                          return (
                            <Badge
                              key={id}
                              className="bg-amber-500/15 text-amber-300 border-amber-500/20 text-xs pl-2 pr-1 py-1 flex items-center gap-1"
                            >
                              {permit?.title ?? 'Permit'}
                              <button
                                onClick={() =>
                                  setSelectedPermitIds((prev) => prev.filter((x) => x !== id))
                                }
                                className="ml-0.5 p-0.5 rounded-full hover:bg-white/10 touch-manipulation"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          );
                        })}
                      </div>
                    )}
                    <div className="space-y-1.5 max-h-40 overflow-y-auto">
                      {activePermits
                        .filter((p) => !selectedPermitIds.includes(p.id))
                        .map((p) => (
                          <button
                            key={p.id}
                            onClick={() => setSelectedPermitIds((prev) => [...prev, p.id])}
                            className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-left touch-manipulation active:scale-[0.99] transition-all"
                          >
                            <FileText className="h-4 w-4 text-amber-400 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white truncate">{p.title}</p>
                              <p className="text-xs text-white truncate">
                                {p.location} &middot;{' '}
                                {new Date(p.end_time).toLocaleDateString('en-GB')}
                              </p>
                            </div>
                            <CheckCircle2 className="h-4 w-4 text-white flex-shrink-0" />
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                {/* Site Photos */}
                <SafetyPhotoCapture
                  photos={diaryPhotos}
                  onPhotosChange={setDiaryPhotos}
                  maxPhotos={5}
                  label="Site Photos"
                />

                {/* Recorder Signature */}
                <SignaturePad
                  label="Recorder Signature"
                  name={recorderSigName}
                  date={recorderSigDate}
                  signatureDataUrl={recorderSigDataUrl}
                  onSignatureChange={setRecorderSigDataUrl}
                  onNameChange={setRecorderSigName}
                  onDateChange={setRecorderSigDate}
                />

                {/* Spacer for fixed footer */}
                <div className="pb-24" />
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="px-4 pt-4"
              >
                <h2 className="text-sm font-semibold text-white mb-3">
                  {selectedDate.toLocaleDateString('en-GB', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </h2>

                {/* Search bar — only show when entries exist for this date */}
                {entriesForDate.length > 0 && (
                  <div className="relative mb-3">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
                    <Input
                      placeholder="Search entries..."
                      className="pl-8 pr-8 h-9 bg-white/5 border-0 focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation rounded-lg"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 hover:bg-white/10 rounded-full touch-manipulation"
                        onClick={() => setSearchQuery('')}
                      >
                        <X className="h-3.5 w-3.5 text-white" />
                      </button>
                    )}
                  </div>
                )}

                {isLoading ? (
                  <SafetySkeletonLoader variant="list" />
                ) : entriesForDate.length === 0 ? (
                  <SafetyEmptyState
                    icon={BookOpen}
                    heading="No Entries for This Date"
                    description="Tap the button below to log your site activity for this day."
                    ctaLabel="New Entry"
                    onCta={() => setShowForm(true)}
                    tip="Keep a daily record for compliance and evidence"
                  />
                ) : filteredEntriesForDate.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Search className="h-8 w-8 text-white mb-3" />
                    <p className="text-sm font-medium text-white">No matching entries</p>
                    <p className="text-xs text-white mt-1">Try a different search term</p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-3 h-9 px-4 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white touch-manipulation"
                    >
                      Clear search
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredEntriesForDate.map((entry: SiteDiaryEntry) => (
                      <SwipeableListItem
                        key={entry.id}
                        rightActions={[
                          {
                            icon: Trash2,
                            label: 'Delete',
                            color: 'bg-red-500',
                            onAction: () => setDeleteTarget(entry.id),
                          },
                        ]}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-xl bg-white/5 border border-white/10"
                        >
                          <h3 className="text-base font-semibold text-white mb-2">
                            {entry.site_name}
                          </h3>
                          {entry.site_address && (
                            <div className="flex items-center gap-2 text-sm text-white mb-2">
                              <MapPin className="w-3.5 h-3.5" />
                              {entry.site_address}
                            </div>
                          )}
                          <div className="flex flex-wrap gap-3 text-sm text-white mb-2">
                            {entry.weather && (
                              <div className="flex items-center gap-1 capitalize">
                                {(() => {
                                  const opt = WEATHER_OPTIONS.find(
                                    (w) => w.value === entry.weather
                                  );
                                  const Icon = opt?.icon ?? Cloud;
                                  return (
                                    <>
                                      <Icon className="w-3.5 h-3.5" />
                                      {entry.weather}
                                    </>
                                  );
                                })()}
                              </div>
                            )}
                            {(entry.start_time || entry.end_time) && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {entry.start_time ?? '?'} - {entry.end_time ?? '?'}
                              </div>
                            )}
                            {entry.personnel_count != null && (
                              <div className="flex items-center gap-1">
                                <Users className="w-3.5 h-3.5" />
                                {entry.personnel_count} on site
                              </div>
                            )}
                          </div>
                          {entry.work_completed && (
                            <p className="text-sm text-white line-clamp-3">
                              {entry.work_completed}
                            </p>
                          )}
                          {((entry.rams_ids?.length ?? 0) > 0 ||
                            (entry.permit_ids?.length ?? 0) > 0) && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {entry.rams_ids?.map((id) => (
                                <Badge
                                  key={id}
                                  className="bg-cyan-500/15 text-cyan-300 border-cyan-500/20 text-[10px] flex items-center gap-1"
                                >
                                  <Shield className="h-3 w-3" />
                                  RAMS
                                </Badge>
                              ))}
                              {entry.permit_ids?.map((id) => (
                                <Badge
                                  key={id}
                                  className="bg-amber-500/15 text-amber-300 border-amber-500/20 text-[10px] flex items-center gap-1"
                                >
                                  <FileText className="h-3 w-3" />
                                  Permit
                                </Badge>
                              ))}
                            </div>
                          )}
                          <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
                            <button
                              onClick={() => exportPDF('site-diary', entry.id)}
                              disabled={isExporting && exportingId === entry.id}
                              className="h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium flex items-center gap-2 touch-manipulation active:scale-[0.98] transition-all disabled:opacity-50"
                            >
                              {isExporting && exportingId === entry.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Download className="h-4 w-4" />
                              )}
                              Export PDF
                            </button>
                            <button
                              onClick={() => handleDuplicate(entry)}
                              className="h-11 px-3 rounded-xl bg-white/5 border border-white/[0.08] text-white text-xs font-medium flex items-center gap-1 touch-manipulation active:scale-[0.98] transition-all"
                            >
                              <Copy className="h-3.5 w-3.5 mr-1" />
                              Duplicate
                            </button>
                          </div>
                        </motion.div>
                      </SwipeableListItem>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PullToRefresh>

      {/* Sticky submit bar - only in form mode */}
      {showForm && (
        <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-white/10 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] z-40">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || createEntry.isPending}
            className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-base touch-manipulation active:scale-[0.98] transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            {createEntry.isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Entry'
            )}
          </button>
        </div>
      )}

      {/* FAB */}
      {!showForm && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-2xl bg-elec-yellow text-black flex items-center justify-center shadow-lg shadow-black/30 touch-manipulation active:scale-90 transition-transform z-50"
          onClick={() => setShowForm(true)}
        >
          <Plus className="w-6 h-6" />
        </motion.button>
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
        title="Delete Diary Entry?"
        description="This entry will be permanently removed"
        isDeleting={deleteEntry.isPending}
      />
    </div>
  );
}

export default ElectricianSiteDiary;
