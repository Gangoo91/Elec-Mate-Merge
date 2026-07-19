/**
 * StatusPage — routed Worker Tools page (replaces StatusSheet bottom sheet).
 *
 * Workers set their current status/check-in here. Captures GPS location and
 * updates employer_worker_locations via useWorkerSelfService.updateLocation.
 *
 * Chrome only changed (sheet → page): all data hooks, the updateLocation
 * mutation, GPS capture, job picker and submit guards are carried over from
 * StatusSheet unchanged in behaviour. Improvements: a prominent current-status
 * hero with last-set time, a quick OptionTile status switcher, and clearer
 * inline feedback — all using existing data only.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, Navigation, Clock, Loader2 } from 'lucide-react';
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
    tone: 'yellow',
  },
  {
    value: 'Off Duty',
    label: 'Off Duty',
    hint: 'Clocked off',
    icon: Clock,
    tone: 'blue',
  },
];

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

  // Initialise with the current presence status once it loads.
  useEffect(() => {
    if (presenceStatus) {
      setSelectedStatus(presenceStatus);
    }
  }, [presenceStatus]);

  const handleUpdateStatus = async () => {
    if ((selectedStatus === 'On Site' || selectedStatus === 'En Route') && !selectedJobId) {
      toast.error('Please select a job');
      return;
    }

    setIsGettingLocation(true);

    try {
      // Get GPS location
      const position = await getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      });

      const { latitude: lat, longitude: lng, accuracy } = position;

      await updateLocation.mutateAsync({
        lat,
        lng,
        status: selectedStatus,
        jobId:
          selectedStatus === 'On Site' || selectedStatus === 'En Route' ? selectedJobId : undefined,
        accuracy,
      });

      setShowSuccess(true);
      toast.success(`Status updated to ${selectedStatus}`);
      window.setTimeout(() => {
        setShowSuccess(false);
      }, 900);
    } catch (error: unknown) {
      const geoError = error as GeolocationPositionError;
      if (geoError.code === 1) {
        toast.error('Location access denied. Please enable location services.');
      } else if (geoError.code === 2) {
        toast.error('Could not determine your location. Please try again.');
      } else if (geoError.code === 3) {
        toast.error('Location request timed out. Please try again.');
      } else {
        toast.error('Failed to update status');
      }
    } finally {
      setIsGettingLocation(false);
    }
  };

  const isUpdating = updateLocation.isPending || isGettingLocation;
  const showJobSelector = selectedStatus === 'On Site' || selectedStatus === 'En Route';

  const currentStatus = STATUS_OPTIONS.find((o) => o.value === presenceStatus);
  const selectedOption = STATUS_OPTIONS.find((o) => o.value === selectedStatus);
  const lastUpdated = relativeTime(myLocation?.last_updated);

  // A submit changes nothing when the chosen status already matches the
  // current one AND no job re-selection is needed — guide the worker instead.
  const isNoChange = !!presenceStatus && selectedStatus === presenceStatus && !showJobSelector;
  const isSubmitBlocked = isUpdating || (showJobSelector && !selectedJobId) || isNoChange;

  return (
    <WorkerToolPage
      eyebrow="Status"
      title="My Status"
      description="Share where you are so your team can see your status."
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
                <div className="grid grid-cols-2 gap-2.5">
                  {STATUS_OPTIONS.map((option) => {
                    const Icon = option.icon;
                    const isSelected = selectedStatus === option.value;
                    const isCurrent = presenceStatus === option.value;

                    return (
                      <OptionTile
                        key={option.value}
                        vertical
                        selected={isSelected}
                        onClick={() => !isUpdating && setSelectedStatus(option.value)}
                        icon={
                          <Icon
                            className={isSelected ? 'h-5 w-5 text-elec-yellow' : 'h-5 w-5 text-white'}
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
                  >
                    <div className="flex items-center justify-between">
                      <Eyebrow>Which job?</Eyebrow>
                      {!selectedJobId && (jobs?.length ?? 0) > 0 && (
                        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-elec-yellow/80">
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
                      <Select value={selectedJobId} onValueChange={setSelectedJobId} disabled={isUpdating}>
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
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-elec-yellow/10">
                  <MapPin className="h-4 w-4 text-elec-yellow" />
                </span>
                <p className="text-[12.5px] text-white leading-snug">
                  Your GPS location is captured when you update — so your team can see where you are.
                </p>
              </div>

              {/* Submit */}
              <PrimaryButton
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
                    <MapPin className="h-5 w-5 mr-2" />
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
                    <p className="text-[12px] text-white/60 truncate">{employee.role}</p>
                  </div>
                </div>
                {currentStatus && <Pill tone={currentStatus.tone}>{currentStatus.label}</Pill>}
              </div>

              <div className="mt-6">
                <Eyebrow>Current status</Eyebrow>
                <div className="mt-2 text-[34px] sm:text-5xl font-semibold tracking-tight leading-none text-white">
                  {currentStatus?.label ?? 'Not set'}
                </div>
                <p className="mt-2.5 text-[13px] text-white/60">
                  {lastUpdated ? `Last set ${lastUpdated}` : 'No status set yet'}
                </p>
              </div>
            </section>
          }
        />
      )}
    </WorkerToolPage>
  );
}
