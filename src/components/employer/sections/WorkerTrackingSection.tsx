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
  type Tone,
} from '@/components/employer/editorial';

const STATUS_TONE: Record<string, Tone> = {
  'On Site': 'emerald',
  'En Route': 'blue',
  Office: 'amber',
  'On Leave': 'red',
};

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
    await refetchLocations();
    setLastUpdated(new Date());
    toast({ title: 'Workers refreshed', description: 'Location data updated' });
  }, [refetchLocations]);

  const handleCall = (employeeName: string) => {
    toast({ title: `Calling ${employeeName}...`, description: 'Opening phone dialler' });
  };

  const handleMessage = (employeeName: string) => {
    toast({ title: `Messaging ${employeeName}...`, description: 'Opening message composer' });
  };

  const handleCheckIn = async () => {
    if (!selectedEmployee || !selectedJob) {
      toast({ title: 'Select employee and job', variant: 'destructive' });
      return;
    }

    try {
      let lat = 53.4808;
      let lng = -2.2426;

      const selectedJobData = jobsData.find((j) => j.id === selectedJob);
      if (selectedJobData?.lat && selectedJobData?.lng) {
        lat = selectedJobData.lat;
        lng = selectedJobData.lng;
      }

      try {
        const position = await getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 60000,
        });
        lat = position.latitude;
        lng = position.longitude;
      } catch {
        // GPS unavailable, fall back to job location or default
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

  const workerCheckIns = useMemo(() => {
    const locationMap = new Map(workerLocations.map((loc) => [loc.employee_id, loc]));

    return employees.map((emp) => {
      const location = locationMap.get(emp.id);
      const jobData = location?.jobs as { title?: string } | null | undefined;

      return {
        id: emp.id,
        employeeId: emp.id,
        employeeName: emp.name,
        status: location?.status || (emp.status === 'On Leave' ? 'On Leave' : 'Office'),
        jobTitle: jobData?.title || null,
        checkInTime: location?.checked_in_at
          ? new Date(location.checked_in_at).toLocaleTimeString('en-GB', {
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
                  className={viewMode === 'list' ? 'bg-elec-yellow text-black border-elec-yellow' : ''}
                >
                  <List className="h-4 w-4" />
                </IconButton>
                <IconButton
                  onClick={() => setViewMode('map')}
                  aria-label="Map view"
                  className={viewMode === 'map' ? 'bg-elec-yellow text-black border-elec-yellow' : ''}
                >
                  <MapIcon className="h-4 w-4" />
                </IconButton>
              </>
            )}
            <IconButton
              onClick={() => setIsCheckInOpen(true)}
              aria-label="Check in worker"
            >
              <UserPlus className="h-4 w-4" />
            </IconButton>
            <IconButton
              onClick={handleRefresh}
              disabled={locationsLoading}
              aria-label="Refresh"
            >
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
          { label: 'Off-duty', value: statusCounts.office + statusCounts.onLeave, tone: 'amber' },
          { label: 'Alerts', value: 0, tone: 'red' },
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
                    workerLocations={workerLocations}
                    jobs={jobsData}
                    officeLocation={officeLocation}
                    onRefresh={handleRefresh}
                    isLoading={locationsLoading || jobsLoading}
                    className={isMobile ? 'h-[60vh]' : undefined}
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
                      action={
                        searchQuery || activeTab !== 'all' ? 'Clear filters' : undefined
                      }
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
                          ? `Checked in ${checkIn.checkInTime}`
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
                              {!isMobile && checkIn.phone && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCall(checkIn.employeeName);
                                  }}
                                  className="h-9 w-9 rounded-full bg-white/[0.04] border border-white/[0.08] text-white flex items-center justify-center hover:bg-white/[0.08] touch-manipulation"
                                  aria-label={`Call ${checkIn.employeeName}`}
                                >
                                  <Phone className="h-4 w-4" />
                                </button>
                              )}
                              {!isMobile && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleMessage(checkIn.employeeName);
                                  }}
                                  className="h-9 w-9 rounded-full bg-white/[0.04] border border-white/[0.08] text-white flex items-center justify-center hover:bg-white/[0.08] touch-manipulation"
                                  aria-label={`Message ${checkIn.employeeName}`}
                                >
                                  <MessageSquare className="h-4 w-4" />
                                </button>
                              )}
                              {!isMobile && checkIn.locationId && checkIn.status === 'On Site' && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCheckOut(checkIn.locationId!, checkIn.employeeName);
                                  }}
                                  disabled={checkOutMutation.isPending}
                                  className="h-9 px-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-white text-[12px] font-medium flex items-center gap-1.5 hover:bg-white/[0.08] touch-manipulation disabled:opacity-50"
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
                    .filter((job) => job.status === 'In Progress' || job.status === 'Scheduled')
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
    </PageFrame>
  );

  return isMobile ? (
    <PullToRefresh onRefresh={handleRefresh} className="h-full">
      {content}
    </PullToRefresh>
  ) : (
    content
  );
}
