import { useState, useCallback, useEffect, useMemo } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  RefreshCw,
  MapPin,
  List,
  Map as MapIcon,
  LogIn,
  LogOut,
  UserPlus,
  Phone,
  MessageSquare,
} from 'lucide-react';
import { useEmployees } from '@/hooks/useEmployees';
import { useIsMobile } from '@/hooks/use-mobile';
import { LiveWorkerMap } from '../LiveWorkerMap';
import { GoogleMapsProvider } from '@/contexts/GoogleMapsContext';
import {
  useWorkerLocations,
  useCheckInWorker,
  useCheckOutWorker,
} from '@/hooks/useWorkerLocations';
import { useJobs } from '@/hooks/useJobs';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { useQuery } from '@tanstack/react-query';
import { getOfficeLocation } from '@/services/settingsService';
import { toast } from '@/hooks/use-toast';
import { getCurrentPosition } from '@/utils/geolocation';
import { createCommunication } from '@/services/communicationService';
import {
  PageFrame,
  PageHero,
  StatStrip,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  IconButton,
  FilterBar,
  EmptyState,
  LoadingBlocks,
  PrimaryButton,
  selectTriggerClass,
  selectContentClass,
  textareaClass,
  type Tone,
} from '@/components/employer/editorial';

const STATUS_TONE: Record<string, Tone> = {
  'On Site': 'emerald',
  'En Route': 'blue',
  Office: 'amber',
  'On Leave': 'red',
  'Off Duty': 'purple',
};

/** A location update older than this is presented as history, not live. */
const STALE_AFTER_HOURS = 12;

export function WorkerTrackingSection() {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [selectedJob, setSelectedJob] = useState<string>('');

  const checkInMutation = useCheckInWorker();
  const checkOutMutation = useCheckOutWorker();

  const {
    data: workerLocations = [],
    isLoading: locationsLoading,
    refetch: refetchLocations,
  } = useWorkerLocations();
  const { data: jobsData = [], isLoading: jobsLoading } = useJobs();
  const { data: employees = [], isLoading: employeesLoading } = useEmployees();

  const { data: officeLocation } = useQuery({
    queryKey: ['office-location'],
    queryFn: getOfficeLocation,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetchLocations();
      setLastUpdated(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, [refetchLocations]);

  const handleRefresh = useCallback(async () => {
    // refetch never throws — check the result so a failed refresh can't
    // toast "updated" over stale data
    const result = await refetchLocations();
    if (result.error) {
      toast({
        title: 'Refresh failed',
        description: 'Could not update locations — check your connection.',
        variant: 'destructive',
      });
      return;
    }
    setLastUpdated(new Date());
    toast({ title: 'Workers refreshed', description: 'Location data updated' });
  }, [refetchLocations]);

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  // Proper composer sheet — window.prompt broke in WebViews and had no
  // native feel; the worker receives this through the comms pipeline
  const [messageTarget, setMessageTarget] = useState<{ id: string; name: string } | null>(null);
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleMessage = (employeeId: string, employeeName: string) => {
    setMessageText('');
    setMessageTarget({ id: employeeId, name: employeeName });
  };

  const sendWorkerMessage = async () => {
    if (!messageTarget || !messageText.trim()) return;
    setIsSending(true);
    try {
      await createCommunication({
        sender_id: null,
        type: 'message',
        title: `Message for ${messageTarget.name}`,
        content: messageText.trim(),
        priority: 'normal',
        target_audience: 'specific',
        target_employee_ids: [messageTarget.id],
        attachments: null,
        is_pinned: false,
        expires_at: null,
      });
      toast({ title: 'Message sent', description: `Sent to ${messageTarget.name}.` });
      setMessageTarget(null);
      setMessageText('');
    } catch {
      toast({ title: 'Send failed', variant: 'destructive' });
    } finally {
      setIsSending(false);
    }
  };

  const handleCheckIn = async () => {
    if (!selectedEmployee || !selectedJob) {
      toast({ title: 'Select employee and job', variant: 'destructive' });
      return;
    }

    try {
      // A remote check-in records where the WORKER is — the job site — never
      // the admin's own device GPS (an office check-in would pin the worker at
      // head office). Job coordinates win; admin GPS is only a last resort for
      // jobs with no coordinates on record.
      let lat: number | null = null;
      let lng: number | null = null;

      const selectedJobData = jobsData.find((j) => j.id === selectedJob);
      // != null, not truthiness — longitude 0 is the Greenwich meridian, which
      // runs through east London; a real coordinate, not a missing one
      if (selectedJobData?.lat != null && selectedJobData?.lng != null) {
        lat = selectedJobData.lat;
        lng = selectedJobData.lng;
      } else {
        try {
          const position = await getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 60000,
          });
          lat = position.latitude;
          lng = position.longitude;
        } catch {
          // No job coords and no GPS — refuse to invent a position
        }
      }

      if (lat === null || lng === null) {
        toast({
          title: 'No location available',
          description: 'Add an address to the job, or ask the worker to check in from their phone.',
          variant: 'destructive',
        });
        return;
      }

      await checkInMutation.mutateAsync({
        employeeId: selectedEmployee,
        jobId: selectedJob,
        lat,
        lng,
      });

      toast({ title: 'Worker checked in', description: 'Location recorded successfully' });
      setIsCheckInOpen(false);
      setSelectedEmployee('');
      setSelectedJob('');
    } catch {
      toast({ title: 'Check-in failed', variant: 'destructive' });
    }
  };

  const handleCheckOut = async (locationId: string, employeeName: string) => {
    try {
      await checkOutMutation.mutateAsync(locationId);
      toast({ title: `${employeeName} checked out`, description: 'Shift ended' });
    } catch {
      toast({ title: 'Check-out failed', variant: 'destructive' });
    }
  };

  // The map must tell the same truth as the list — stale rows demote there too,
  // so a fortnight-old position can't render as a live green marker.
  const mapLocations = useMemo(
    () =>
      workerLocations
        // Archived leavers keep their historic rows — don't plot them
        .filter((loc) => (loc.employees?.status || '').toLowerCase() !== 'archived')
        .map((loc) => {
          const isStale =
            !loc.last_updated ||
            Date.now() - new Date(loc.last_updated).getTime() > STALE_AFTER_HOURS * 60 * 60 * 1000;
          return isStale ? { ...loc, status: 'Off Duty' as typeof loc.status } : loc;
        }),
    [workerLocations]
  );

  const workerCheckIns = useMemo(() => {
    const locationMap = new Map(workerLocations.map((loc) => [loc.employee_id, loc]));

    // Leavers are not a workforce to track — an archived employee showing as
    // "in the office" is a straight lie to the owner scanning this at 7am.
    const trackableEmployees = employees.filter(
      (emp) => (emp.status || '').toLowerCase() !== 'archived'
    );

    return trackableEmployees.map((emp) => {
      const location = locationMap.get(emp.id);
      const jobData = location?.jobs as { title?: string } | null | undefined;

      // A days-old "On Site" row is history, not a live position — presenting
      // it as live (with a time-only stamp implying today) was the page's
      // biggest lie. Stale rows demote to Off Duty with a dated "last seen".
      const lastUpdatedMs = location?.last_updated ? new Date(location.last_updated).getTime() : 0;
      const isStale = !!location && Date.now() - lastUpdatedMs > STALE_AFTER_HOURS * 60 * 60 * 1000;
      // No location row at all = we simply don't know where they are. That is
      // "Off Duty" (no check-in), never "Office" — defaulting everyone to
      // Office fabricated a full office and hid who hadn't turned up.
      const liveStatus = isStale
        ? 'Off Duty'
        : location?.status || (emp.status === 'On Leave' ? 'On Leave' : 'Off Duty');
      const stamp = location?.checked_in_at || location?.last_updated;

      return {
        id: emp.id,
        employeeId: emp.id,
        employeeName: emp.name,
        status: liveStatus,
        isStale,
        jobTitle: jobData?.title || null,
        checkInTime: stamp
          ? isStale
            ? `Last seen ${new Date(stamp).toLocaleDateString('en-GB', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              })}`
            : new Date(stamp).toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
              })
          : null,
        avatar: emp.avatar_initials,
        role: emp.team_role,
        phone: emp.phone || null,
        lat: location?.lat,
        lng: location?.lng,
        locationId: location?.id,
      };
    });
  }, [employees, workerLocations]);

  const statusCounts = useMemo(
    () => ({
      onSite: workerCheckIns.filter((c) => c.status === 'On Site').length,
      enRoute: workerCheckIns.filter((c) => c.status === 'En Route').length,
      office: workerCheckIns.filter((c) => c.status === 'Office').length,
      onLeave: workerCheckIns.filter((c) => c.status === 'On Leave').length,
      offDuty: workerCheckIns.filter((c) => c.status === 'Off Duty').length,
    }),
    [workerCheckIns]
  );

  const filteredCheckIns = useMemo(() => {
    return workerCheckIns.filter((c) => {
      const matchesSearch =
        c.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      const matchesTab =
        activeTab === 'all' ||
        (activeTab === 'onsite' && c.status === 'On Site') ||
        (activeTab === 'enroute' && c.status === 'En Route') ||
        (activeTab === 'office' && c.status === 'Office') ||
        (activeTab === 'offduty' && c.status === 'Off Duty') ||
        (activeTab === 'onleave' && c.status === 'On Leave');
      return matchesSearch && matchesTab;
    });
  }, [workerCheckIns, searchQuery, activeTab]);

  const totalWorkers = workerCheckIns.length;

  const formatLastUpdated = () => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastUpdated.getTime()) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getInitials = (name: string, fallback?: string) => {
    if (fallback) return fallback;
    return name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const isLoading = employeesLoading || locationsLoading;

  const content = (
    <PageFrame>
      <PageHero
        eyebrow="Operations"
        title="Worker Tracking"
        description="Live GPS, check-ins and location history."
        tone="cyan"
        live={{ label: `Updated ${formatLastUpdated()}`, tone: 'green' }}
        actions={
          <>
            {isMobile && (
              <>
                <IconButton
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                  className={
                    viewMode === 'list' ? 'bg-elec-yellow text-black border-elec-yellow' : ''
                  }
                >
                  <List className="h-4 w-4" />
                </IconButton>
                <IconButton
                  onClick={() => setViewMode('map')}
                  aria-label="Map view"
                  className={
                    viewMode === 'map' ? 'bg-elec-yellow text-black border-elec-yellow' : ''
                  }
                >
                  <MapIcon className="h-4 w-4" />
                </IconButton>
              </>
            )}
            <IconButton onClick={() => setIsCheckInOpen(true)} aria-label="Check in worker">
              <UserPlus className="h-4 w-4" />
            </IconButton>
            <IconButton onClick={handleRefresh} disabled={locationsLoading} aria-label="Refresh">
              <RefreshCw className={locationsLoading ? 'h-4 w-4 animate-spin' : 'h-4 w-4'} />
            </IconButton>
          </>
        }
      />

      <StatStrip
        columns={4}
        stats={[
          { label: 'On site', value: statusCounts.onSite, tone: 'emerald' },
          { label: 'Travelling', value: statusCounts.enRoute, tone: 'blue' },
          { label: 'Office', value: statusCounts.office, tone: 'amber' },
          {
            label: 'Off duty / leave',
            value: statusCounts.offDuty + statusCounts.onLeave,
            tone: 'purple',
            sub: statusCounts.onLeave > 0 ? `${statusCounts.onLeave} on leave` : undefined,
          },
        ]}
      />

      {isLoading ? (
        <LoadingBlocks />
      ) : (
        <>
          {(!isMobile || viewMode === 'map') && (
            <ListCard>
              <ListCardHeader
                tone="cyan"
                title="Live map"
                meta={
                  <Pill tone="cyan">
                    {totalWorkers} {totalWorkers === 1 ? 'worker' : 'workers'}
                  </Pill>
                }
              />
              <div className="p-4 sm:p-5">
                <GoogleMapsProvider>
                  <LiveWorkerMap
                    workerLocations={mapLocations}
                    jobs={jobsData}
                    officeLocation={officeLocation}
                    onRefresh={handleRefresh}
                    isLoading={locationsLoading || jobsLoading}
                  />
                </GoogleMapsProvider>
              </div>
            </ListCard>
          )}

          {(!isMobile || viewMode === 'list') && (
            <>
              <FilterBar
                tabs={[
                  { value: 'all', label: 'All', count: totalWorkers },
                  { value: 'onsite', label: 'On site', count: statusCounts.onSite },
                  { value: 'enroute', label: 'Travelling', count: statusCounts.enRoute },
                  { value: 'office', label: 'Office', count: statusCounts.office },
                  { value: 'offduty', label: 'Off duty', count: statusCounts.offDuty },
                  { value: 'onleave', label: 'On leave', count: statusCounts.onLeave },
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                search={searchQuery}
                onSearchChange={setSearchQuery}
                searchPlaceholder="Search workers or jobs…"
              />

              <ListCard>
                <ListCardHeader
                  tone="cyan"
                  title="Workers"
                  meta={<Pill tone="cyan">{filteredCheckIns.length}</Pill>}
                />
                {filteredCheckIns.length === 0 ? (
                  <div className="p-5">
                    <EmptyState
                      title="No workers found"
                      description={
                        searchQuery || activeTab !== 'all'
                          ? 'Try clearing filters to see all workers.'
                          : 'Add employees to start tracking their locations.'
                      }
                      action={searchQuery || activeTab !== 'all' ? 'Clear filters' : undefined}
                      onAction={
                        searchQuery || activeTab !== 'all'
                          ? () => {
                              setSearchQuery('');
                              setActiveTab('all');
                            }
                          : undefined
                      }
                    />
                  </div>
                ) : (
                  <ListBody>
                    {filteredCheckIns.map((checkIn) => {
                      const tone = STATUS_TONE[checkIn.status] ?? 'amber';
                      const lastSeen = checkIn.checkInTime ?? '—';
                      const subtitleParts = [
                        checkIn.role,
                        checkIn.jobTitle,
                        checkIn.checkInTime
                          ? checkIn.isStale
                            ? checkIn.checkInTime // already reads "Last seen Tue 15 Jan"
                            : `Checked in ${checkIn.checkInTime}`
                          : 'No check-in today',
                      ].filter(Boolean);

                      return (
                        <ListRow
                          key={checkIn.id}
                          accent={tone}
                          lead={
                            <Avatar
                              initials={getInitials(checkIn.employeeName, checkIn.avatar)}
                              online={checkIn.status === 'On Site' || checkIn.status === 'En Route'}
                            />
                          }
                          title={checkIn.employeeName}
                          subtitle={subtitleParts.join(' · ')}
                          trailing={
                            <>
                              <Pill tone={tone}>{checkIn.status}</Pill>
                              <span className="hidden sm:inline text-[11px] text-white tabular-nums">
                                {lastSeen}
                              </span>
                              {/* Actions on BOTH form factors — a phone is where
                                  calling a worker matters most; these were
                                  desktop-only, leaving mobile rows dead ends */}
                              {checkIn.phone && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCall(checkIn.phone!);
                                  }}
                                  className="h-11 w-11 rounded-full bg-white/[0.04] border border-white/[0.08] text-white flex items-center justify-center hover:bg-white/[0.08] touch-manipulation"
                                  aria-label={`Call ${checkIn.employeeName}`}
                                >
                                  <Phone className="h-4 w-4" />
                                </button>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMessage(checkIn.employeeId, checkIn.employeeName);
                                }}
                                className="h-11 w-11 rounded-full bg-white/[0.04] border border-white/[0.08] text-white flex items-center justify-center hover:bg-white/[0.08] touch-manipulation"
                                aria-label={`Message ${checkIn.employeeName}`}
                              >
                                <MessageSquare className="h-4 w-4" />
                              </button>
                              {/* Any open row can be closed — On Site, En Route
                                  and Office are all live shifts, and stale rows
                                  (forgotten check-outs) especially need it */}
                              {checkIn.locationId &&
                                (['On Site', 'En Route', 'Office'].includes(checkIn.status) ||
                                  checkIn.isStale) && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCheckOut(checkIn.locationId!, checkIn.employeeName);
                                    }}
                                    disabled={checkOutMutation.isPending}
                                    className="h-11 px-4 rounded-full bg-white/[0.04] border border-white/[0.08] text-white text-[12px] font-medium flex items-center gap-1.5 hover:bg-white/[0.08] touch-manipulation disabled:opacity-50"
                                  >
                                    <LogOut className="h-3.5 w-3.5" />
                                    Check out
                                  </button>
                                )}
                            </>
                          }
                        />
                      );
                    })}
                  </ListBody>
                )}
              </ListCard>
            </>
          )}
        </>
      )}

      {isMobile && viewMode === 'list' && (
        <div className="fixed bottom-24 right-4 z-40 flex flex-col gap-3">
          <button
            onClick={() => setIsCheckInOpen(true)}
            className="h-14 w-14 rounded-full shadow-lg bg-elec-yellow text-black flex items-center justify-center touch-manipulation"
            aria-label="Check in worker"
          >
            <UserPlus className="h-6 w-6" />
          </button>
          {filteredCheckIns.length > 0 && (
            <button
              onClick={() => setViewMode('map')}
              className="h-14 w-14 rounded-full shadow-lg bg-[hsl(0_0%_12%)] border border-white/[0.08] text-white flex items-center justify-center touch-manipulation"
              aria-label="Open map"
            >
              <MapPin className="h-6 w-6" />
            </button>
          )}
        </div>
      )}

      <Sheet open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
        <SheetContent
          side={isMobile ? 'bottom' : 'right'}
          className={
            isMobile
              ? 'h-[70vh] rounded-t-2xl bg-[hsl(0_0%_10%)] border-white/[0.06]'
              : 'bg-[hsl(0_0%_10%)] border-white/[0.06]'
          }
        >
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-white">
              <LogIn className="h-5 w-5 text-elec-yellow" />
              Check in worker
            </SheetTitle>
            <SheetDescription className="text-white">
              Record a worker's arrival at a job site.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label className="text-white">Select worker</Label>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Choose a worker…" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {employees
                    .filter((emp) => emp.status === 'active' || emp.status === 'Active')
                    .map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Select job site</Label>
              <Select value={selectedJob} onValueChange={setSelectedJob}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Choose a job…" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {jobsData
                    .filter((job) => job.status === 'Active' || job.status === 'Pending')
                    .map((job) => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <PrimaryButton
              onClick={handleCheckIn}
              disabled={!selectedEmployee || !selectedJob || checkInMutation.isPending}
              fullWidth
              size="lg"
            >
              {checkInMutation.isPending ? (
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <LogIn className="h-4 w-4 mr-2" />
              )}
              Check in to site
            </PrimaryButton>
          </div>
        </SheetContent>
      </Sheet>

      {/* Message composer — replaces window.prompt */}
      <Sheet open={!!messageTarget} onOpenChange={(open) => !open && setMessageTarget(null)}>
        <SheetContent
          side={isMobile ? 'bottom' : 'right'}
          className={
            isMobile
              ? 'h-auto rounded-t-2xl bg-[hsl(0_0%_10%)] border-t border-white/[0.06] p-0'
              : 'w-full sm:max-w-md bg-[hsl(0_0%_10%)] border-l border-white/[0.06] p-0'
          }
        >
          <SheetHeader className="px-5 py-4 border-b border-white/[0.06] text-left">
            <SheetTitle className="text-white text-[15px] font-semibold">
              Message {messageTarget?.name}
            </SheetTitle>
            <SheetDescription className="text-white/55 text-[12px]">
              Lands in their Worker Tools comms with a push notification.
            </SheetDescription>
          </SheetHeader>
          <div className="p-5 space-y-4">
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your message…"
              rows={4}
              autoFocus
              className={textareaClass}
            />
            <PrimaryButton
              onClick={sendWorkerMessage}
              disabled={!messageText.trim() || isSending}
              fullWidth
            >
              {isSending ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : null}
              Send message
            </PrimaryButton>
          </div>
        </SheetContent>
      </Sheet>
    </PageFrame>
  );

  return isMobile ? (
    <PullToRefresh onRefresh={handleRefresh}>{content}</PullToRefresh>
  ) : (
    content
  );
}
