/**
 * StatusPage — routed Worker Tools page (replaces StatusSheet bottom sheet).
 *
 * Workers set their current status here; it writes employer_worker_locations
 * via useWorkerSelfService.updateLocation.
 *
 * ELE-2004:
 * - A failed save shows an error with Retry — never "Status updated".
 * - Location is taken only for On Site / En Route. Office and Off Duty save
 *   without it, so a worker with location turned off can still finish the day.
 * - Live: the office overriding the status, or clocking out (which sets Off
 *   Duty in the DB), updates this page straight away and says who did it.
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, Navigation, Clock, Loader2, AlertTriangle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { getCurrentPosition } from '@/utils/geolocation';
import { useWorkerSelfService, useMyJobs } from '@/hooks/useWorkerSelfService';
import { useMyLatestLocation } from '@/hooks/useWorkerLocations';
import { WorkerStatus } from '@/services/locationService';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import type { HelpBlocker } from '@/components/hub/PageHelp';
import { WT_STATUS_HELP } from '@/components/worker-tools/help/worker-help';
import {
  Avatar,
  Eyebrow,
  Pill,
  OptionTile,
  PrimaryButton,
  SuccessCheckmark,
  EmptyState,
  LoadingBlocks,
  SplitLayout,
  selectContentClass,
  selectTriggerClass,
  type Tone,
} from '@/components/employer/editorial';

const STATUS_OPTIONS: {
  value: WorkerStatus;
  label: string;
  hint: string;
  icon: typeof MapPin;
  tone: Tone;
}[] = [
  {
    value: 'On Site',
    label: 'On Site',
    hint: 'At the job',
    icon: MapPin,
    tone: 'emerald',
  },
  {
    value: 'En Route',
    label: 'En Route',
    hint: 'Travelling',
    icon: Navigation,
    tone: 'amber',
  },
  {
    value: 'Office',
    label: 'Office',
    hint: 'At base',
    icon: Building2,
    tone: 'purple',
  },
  {
    value: 'Off Duty',
    label: 'Off Duty',
    hint: 'Clocked off',
    icon: Clock,
    tone: 'blue',
  },
];

/** "10:12" — the time of day a status was set. */
function clockTime(iso?: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

/** Compact relative timestamp, e.g. "just now", "12 min ago", "3 h ago". */
function relativeTime(iso?: string | null): string | null {
  if (!iso) return null;
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return null;
  const diffMs = Date.now() - then;
  if (diffMs < 0) return 'just now';
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`;
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
}

export default function StatusPage() {
  const { employee, isLoadingEmployee, updateLocation } = useWorkerSelfService();
  // The worker's assigned, still-open jobs — same list My Jobs shows — not the
  // employer-wide 'Active'-status list, so the picker never disagrees with My Jobs.
  const { data: jobs, isLoading: jobsLoading } = useMyJobs('active');
  // Presence comes from the worker's latest employer_worker_locations row —
  // employee.status is EMPLOYMENT status ('active'), never 'On Site' etc.
  const { data: myLocation } = useMyLatestLocation(employee?.id);
  const presenceStatus = myLocation?.status;

  const [selectedStatus, setSelectedStatus] = useState<WorkerStatus>('Off Duty');
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Initialise with the current presence status once it loads.
  useEffect(() => {
    if (presenceStatus) {
      setSelectedStatus(presenceStatus);
    }
  }, [presenceStatus]);

  // A status the office set (or a clock-out) arriving live while the page is
  // open gets said out loud, not just silently swapped in.
  const seenLocationId = useRef<string | null>(null);
  useEffect(() => {
    if (!myLocation?.id) return;
    const previous = seenLocationId.current;
    seenLocationId.current = myLocation.id;
    if (previous === null || previous === myLocation.id) return;
    // A newer status landed — an old error banner no longer describes it.
    setSaveError(null);
    if (myLocation.source === 'office') {
      toast.info(
        `${myLocation.set_by_name || 'The office'} set you to ${myLocation.status}, ${
          clockTime(myLocation.last_updated) ?? 'just now'
        }`
      );
    } else if (myLocation.source === 'clock') {
      toast.info(
        myLocation.status === 'Off Duty'
          ? 'You clocked out, so you are now Off Duty'
          : `You clocked in, so you are now ${myLocation.status}`
      );
    }
  }, [
    myLocation?.id,
    myLocation?.source,
    myLocation?.set_by_name,
    myLocation?.status,
    myLocation?.last_updated,
  ]);

  const handleUpdateStatus = async () => {
    setSaveError(null);
    if ((selectedStatus === 'On Site' || selectedStatus === 'En Route') && !selectedJobId) {
      toast.error('Choose the job first');
      return;
    }

    const needsLocation = selectedStatus === 'On Site' || selectedStatus === 'En Route';
    setIsGettingLocation(needsLocation);

    // Location only while working. Office and Off Duty save without it, so a
    // worker who has denied location can still say they've finished.
    let lat: number | null = null;
    let lng: number | null = null;
    let accuracy: number | undefined;
    if (needsLocation) {
      try {
        const position = await getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        });
        lat = position.latitude;
        lng = position.longitude;
        accuracy = position.accuracy;
      } catch (error: unknown) {
        const geoError = error as GeolocationPositionError;
        const message =
          geoError?.code === 1
            ? 'Location is off. Turn it on to say you are On Site or En Route. Office and Off Duty work without it.'
            : geoError?.code === 3
              ? 'Location timed out. Try again outside or by a window.'
              : 'Could not find your location. Try again.';
        setSaveError(message);
        toast.error(message);
        setIsGettingLocation(false);
        return;
      }
    }

    try {
      await updateLocation.mutateAsync({
        lat,
        lng,
        status: selectedStatus,
        jobId: needsLocation ? selectedJobId : undefined,
        accuracy,
      });

      setShowSuccess(true);
      toast.success(`Status updated to ${selectedStatus}`);
      window.setTimeout(() => {
        setShowSuccess(false);
      }, 900);
    } catch (error: unknown) {
      const raw =
        error instanceof Error
          ? error.message
          : typeof error === 'object' && error && 'message' in error
            ? String((error as { message: unknown }).message)
            : '';
      const offline = typeof navigator !== 'undefined' && navigator.onLine === false;
      const message = offline
        ? 'Status not saved: you are offline. Try again when you have signal.'
        : raw
          ? `Status not saved: ${raw}`
          : 'Status not saved. Try again.';
      setSaveError(message);
      toast.error(message);
    } finally {
      setIsGettingLocation(false);
    }
  };

  const isUpdating = updateLocation.isPending || isGettingLocation;
  const showJobSelector = selectedStatus === 'On Site' || selectedStatus === 'En Route';

  const currentStatus = STATUS_OPTIONS.find((o) => o.value === presenceStatus);
  const selectedOption = STATUS_OPTIONS.find((o) => o.value === selectedStatus);
  const lastUpdated = relativeTime(myLocation?.last_updated);
  const lastUpdatedClock = clockTime(myLocation?.last_updated);
  const setByLine =
    myLocation?.source === 'office'
      ? `${myLocation.set_by_name || 'The office'} set this at ${lastUpdatedClock ?? 'an unknown time'}`
      : myLocation?.source === 'clock'
        ? `Set when you clocked ${myLocation.status === 'Off Duty' ? 'out' : 'in'} at ${lastUpdatedClock ?? ''}`
        : null;
  const accuracyMetres =
    myLocation?.accuracy != null &&
    myLocation.lat != null &&
    (presenceStatus === 'On Site' || presenceStatus === 'En Route')
      ? Math.round(Number(myLocation.accuracy))
      : null;

  // A submit changes nothing when the chosen status already matches the
  // current one AND no job re-selection is needed — guide the worker instead.
  const isNoChange = !!presenceStatus && selectedStatus === presenceStatus && !showJobSelector;
  const isSubmitBlocked = isUpdating || (showJobSelector && !selectedJobId) || isNoChange;

  // Live "Before you start" for the help (ELE-1980).
  const helpBlockers: HelpBlocker[] =
    !jobsLoading && (jobs?.length ?? 0) === 0
      ? [
          {
            text: 'You’re not on any active jobs, so On Site and En Route have no job to pick. Office and Off Duty still work.',
          },
        ]
      : [];

  return (
    <WorkerToolPage
      eyebrow="Status"
      title="My Status"
      description="Share where you are so your team can see your status."
      help={WT_STATUS_HELP}
      helpBlockers={helpBlockers}
    >
      <SuccessCheckmark show={showSuccess} />

      {isLoadingEmployee ? (
        <LoadingBlocks />
      ) : !employee ? (
        <EmptyState
          title="No worker record found"
          description="You need to be linked to a team before you can set your status."
        />
      ) : (
        <SplitLayout
          ratio="1-1"
          primary={
            <>
              {/* Quick status switcher */}
              <section className="space-y-3">
                <Eyebrow>Set your status</Eyebrow>
                <div className="grid grid-cols-2 gap-2.5" data-help="wt-status.options">
                  {STATUS_OPTIONS.map((option) => {
                    const Icon = option.icon;
                    const isSelected = selectedStatus === option.value;
                    const isCurrent = presenceStatus === option.value;

                    return (
                      <OptionTile
                        key={option.value}
                        vertical
                        selected={isSelected}
                        onClick={() => {
                          if (isUpdating) return;
                          setSaveError(null);
                          setSelectedStatus(option.value);
                        }}
                        icon={
                          <Icon
                            className={
                              isSelected ? 'h-5 w-5 text-elec-yellow' : 'h-5 w-5 text-white'
                            }
                          />
                        }
                        label={option.label}
                        sublabel={isCurrent ? 'Current' : option.hint}
                        className={isUpdating ? 'opacity-50 pointer-events-none' : undefined}
                      />
                    );
                  })}
                </div>
              </section>

              {/* Job selector (on-site / en-route only) */}
              <AnimatePresence initial={false}>
                {showJobSelector && (
                  <motion.section
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3 overflow-hidden"
                    data-help="wt-status.job"
                  >
                    <div className="flex items-center justify-between">
                      <Eyebrow>Which job?</Eyebrow>
                      {!selectedJobId && (jobs?.length ?? 0) > 0 && (
                        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-elec-yellow">
                          Required
                        </span>
                      )}
                    </div>

                    {jobsLoading ? (
                      <div className="h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] animate-pulse" />
                    ) : !jobs?.length ? (
                      <EmptyState
                        title="No active jobs available"
                        description="Your employer assigns jobs to you in the planner. You can still set yourself On Site or En Route once one appears."
                      />
                    ) : (
                      <Select
                        value={selectedJobId}
                        onValueChange={setSelectedJobId}
                        disabled={isUpdating}
                      >
                        <SelectTrigger className={selectTriggerClass} aria-label="Select a job">
                          <SelectValue placeholder="Choose a job…" />
                        </SelectTrigger>
                        <SelectContent className={selectContentClass}>
                          {jobs.map((job) => (
                            <SelectItem
                              key={job.id}
                              value={job.id}
                              className="text-white focus:bg-white/10 focus:text-white"
                            >
                              {job.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </motion.section>
                )}
              </AnimatePresence>

              {/* Location info */}
              <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
                  <MapPin className="h-4 w-4 text-elec-yellow" />
                </span>
                <p className="text-[12.5px] text-white leading-snug">
                  {showJobSelector
                    ? 'Your location is shared once, when you save, so the office can see where you are working.'
                    : 'Office and Off Duty never ask for your location.'}
                </p>
              </div>

              {/* Save failed — say so, and offer a retry */}
              {saveError && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3"
                >
                  <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-red-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-white leading-snug">{saveError}</p>
                    <button
                      type="button"
                      onClick={handleUpdateStatus}
                      disabled={isUpdating}
                      className="mt-2 h-11 px-4 rounded-lg border border-white/[0.18] bg-white/[0.06] text-[13px] font-semibold text-white touch-manipulation"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              )}

              {/* Submit */}
              <PrimaryButton
                data-help="wt-status.save"
                size="lg"
                fullWidth
                onClick={handleUpdateStatus}
                disabled={isSubmitBlocked}
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    {updateLocation.isPending ? 'Saving…' : 'Getting location…'}
                  </>
                ) : isNoChange ? (
                  <>Already {selectedOption?.label ?? selectedStatus}</>
                ) : (
                  <>
                    {selectedOption ? <selectedOption.icon className="h-5 w-5 mr-2" /> : null}
                    Set to {selectedOption?.label ?? selectedStatus}
                  </>
                )}
              </PrimaryButton>
            </>
          }
          secondary={
            /* Current status — prominent summary */
            <section className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] p-5 sm:p-7 lg:sticky lg:top-16">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar
                    initials={employee.avatar_initials}
                    photo={employee.photo_url}
                    size="lg"
                    online={presenceStatus === 'On Site' || presenceStatus === 'En Route'}
                  />
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-white truncate">{employee.name}</p>
                    <p className="text-[12px] text-white truncate">{employee.role}</p>
                  </div>
                </div>
                {currentStatus && <Pill tone={currentStatus.tone}>{currentStatus.label}</Pill>}
              </div>

              <div className="mt-6">
                <Eyebrow>Current status</Eyebrow>
                <div className="mt-2 text-[34px] sm:text-5xl font-semibold tracking-tight leading-none text-white">
                  {currentStatus?.label ?? 'Not set'}
                </div>
                <p className="mt-2.5 text-[13px] text-white">
                  {lastUpdated ? `Last set ${lastUpdated}` : 'No status set yet'}
                </p>
                {setByLine && <p className="mt-1 text-[13px] text-white">{setByLine}</p>}
                {accuracyMetres !== null && (
                  <p className="mt-1 text-[13px] text-white">
                    Location accurate to about {accuracyMetres} m
                  </p>
                )}
              </div>
            </section>
          }
        />
      )}
    </WorkerToolPage>
  );
}
