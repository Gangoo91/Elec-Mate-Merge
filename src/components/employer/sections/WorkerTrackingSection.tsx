import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { PageHelpButton, HowItWorks, type HelpBlocker } from '@/components/hub/PageHelp';
import { TRACKING_HELP } from '@/components/employer/help/jobs';
import FormSheet from '@/components/forms/FormSheet';
import { cn } from '@/lib/utils';
import { RefreshCw, LogOut, UserPlus, Phone, MessageSquare, Check, X } from 'lucide-react';
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
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getOfficeLocation } from '@/services/settingsService';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { geocodeAddress } from '@/services/jobService';
import { createCommunication } from '@/services/communicationService';
import {
  PageFrame,
  PageHero,
  LoadingBlocks,
  PrimaryButton,
  textareaClass,
  type Tone,
} from '@/components/employer/editorial';
import {
  frameClass,
  panel,
  HeroActions,
  HeroPrimary,
  RefreshIcon,
  Segments,
  SearchField,
  plural,
} from '@/components/employer/pageParts/PageParts';
import { STATUS_COLOURS, STATUS_RING, statusInk } from '../trackingColours';
import { areaCard, StatCards } from '@/components/employer/hubs/AreaPage';

/** Team list and map share one height on desktop, so the page ends on one line. */
const TRACK_H = 'lg:h-[clamp(560px,calc(100vh-15rem),860px)]';

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('') || '?';

/** Words for each status, in sentence case. */
const STATUS_LABEL: Record<string, string> = {
  'On Site': 'On site',
  'En Route': 'Travelling',
  Office: 'Office',
  'On Leave': 'On leave',
  'Off Duty': 'Off duty',
};

/** A choice in the check-in sheet: picked = solid white, black text. */
const choiceRow = (on: boolean) =>
  cn(
    'flex min-h-[56px] w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-colors touch-manipulation',
    on
      ? 'border-white bg-white text-black'
      : 'border-white/[0.1] bg-white/[0.03] text-white hover:bg-white/[0.06]'
  );

const rowIconBtn =
  'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.04] text-white hover:bg-white/[0.08] touch-manipulation';

/** A location update older than this is presented as history, not live. */
const STALE_AFTER_HOURS = 12;
/** Older than this, a position is still today's but no longer "live" (amber). */
const AMBER_AFTER_MINUTES = 60;

type Freshness = { label: string; tone: Tone | null; ageMs: number };

/**
 * How old a person's last position is, from THE DATA's own timestamp, never
 * the time the page last refetched (ELE-1956). Under an hour is green, an hour
 * to 12 hours amber, older grey (tone null).
 */
/** A freshness label mid-sentence: "just now", but a date keeps its capitals. */
const inLine = (label: string) => (label === 'Just now' ? 'just now' : label);

function freshnessOf(ts: string | null | undefined, now: number): Freshness | null {
  if (!ts) return null;
  const t = new Date(ts).getTime();
  if (Number.isNaN(t)) return null;
  const ageMs = Math.max(0, now - t);
  const mins = Math.floor(ageMs / 60000);
  let label: string;
  if (mins < 1) label = 'Just now';
  else if (mins < 60) label = `${mins} min ago`;
  else if (mins < 24 * 60) label = `${Math.floor(mins / 60)}h ago`;
  else
    // date-fns, not toLocaleDateString: en-GB in Chrome writes "Sept"
    label = format(new Date(t), 'EEE d MMM');
  const tone: Tone | null =
    mins < AMBER_AFTER_MINUTES ? 'emerald' : mins < STALE_AFTER_HOURS * 60 ? 'amber' : null;
  return { label, tone, ageMs };
}

/**
 * A full UK postcode in the job address. Without one the geocoder still
 * answers, confidently and wrongly: "Basement plant room, 14 Orchard Close"
 * (a Sheffield job) came back as Reading. A wrong pin is worse than none, and
 * it would be saved on the job, so only an address with a postcode is looked up.
 */
const UK_POSTCODE = /\b[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}\b/i;
const canGeocode = (address: string | null | undefined) => !!address && UK_POSTCODE.test(address);

export function WorkerTrackingSection() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [confirmOutId, setConfirmOutId] = useState<string | null>(null);
  // An unanswered "are you sure" lapses on its own
  useEffect(() => {
    if (!confirmOutId) return;
    const t = setTimeout(() => setConfirmOutId(null), 4000);
    return () => clearTimeout(t);
  }, [confirmOutId]);
  // Ticks once a minute so "4 min ago" keeps counting without a refetch
  const [now, setNow] = useState(() => Date.now());
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  // Covers the geocode as well as the insert, so a second tap can't double-book
  const [checkingIn, setCheckingIn] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [selectedJob, setSelectedJob] = useState<string>('');

  const checkInMutation = useCheckInWorker();
  const checkOutMutation = useCheckOutWorker();

  const {
    data: workerLocations = [],
    isLoading: locationsLoading,
    refetch: refetchLocations,
    isError: locationsFailed,
  } = useWorkerLocations();
  const { data: jobsData = [], isLoading: jobsLoading } = useJobs();
  const { data: employees = [], isLoading: employeesLoading } = useEmployees();

  const { data: officeLocation } = useQuery({
    queryKey: ['office-location'],
    queryFn: getOfficeLocation,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = useCallback(async () => {
    // refetch never throws — check the result so a failed refresh can't
    // toast "updated" over stale data
    const result = await refetchLocations();
    if (result.error) {
      toast({
        title: 'Refresh failed',
        description: 'Could not update locations. Check your connection.',
        variant: 'destructive',
      });
      return;
    }
    setNow(Date.now());
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

  const checkInJob = jobsData.find((j) => j.id === selectedJob) ?? null;
  const [pickWorkerQ, setPickWorkerQ] = useState('');
  const [pickJobQ, setPickJobQ] = useState('');
  const checkInPeople = employees.filter((e) => e.status === 'active' || e.status === 'Active');
  const checkInJobs = jobsData.filter((j) => j.status === 'Active' || j.status === 'Pending');

  const handleCheckIn = async () => {
    if (!selectedEmployee || !selectedJob) {
      toast({ title: 'Select employee and job', variant: 'destructive' });
      return;
    }
    if (checkingIn) return;
    setCheckingIn(true);

    try {
      // A remote check-in records where the WORKER is: the job site. It never
      // uses the admin's own device GPS, which pinned the worker at the office
      // (ELE-1956). Job coordinates win; a job with an address but no
      // coordinates is geocoded now and the coordinates saved on the job; with
      // neither, the check-in is recorded with the location unknown.
      let lat: number | null = null;
      let lng: number | null = null;

      const selectedJobData = jobsData.find((j) => j.id === selectedJob);
      // != null, not truthiness: longitude 0 is the Greenwich meridian, which
      // runs through east London; a real coordinate, not a missing one
      if (selectedJobData?.lat != null && selectedJobData?.lng != null) {
        lat = selectedJobData.lat;
        lng = selectedJobData.lng;
      } else if (canGeocode(selectedJobData?.location)) {
        const coords = await geocodeAddress(selectedJobData!.location);
        if (coords) {
          lat = coords.lat;
          lng = coords.lng;
          // Save them so the job pins on the map and the next check-in is instant
          const { error: saveErr } = await supabase
            .from('employer_jobs')
            .update({ lat: coords.lat, lng: coords.lng })
            .eq('id', selectedJobData!.id);
          if (!saveErr) queryClient.invalidateQueries({ queryKey: ['employer-jobs'] });
        }
      }

      await checkInMutation.mutateAsync({
        employeeId: selectedEmployee,
        jobId: selectedJob,
        lat,
        lng,
      });

      if (lat === null || lng === null) {
        toast({
          title: 'Checked in, location unknown',
          description: !selectedJobData?.location?.trim()
            ? 'This job has no address. Add one with its postcode so check-ins pin on the map.'
            : canGeocode(selectedJobData.location)
              ? "We couldn't find that postcode on the map. Check the job address so it pins next time."
              : 'The job address has no postcode, so we did not guess. Add the postcode to the job so it pins next time.',
        });
      } else {
        toast({ title: 'Worker checked in', description: 'Pinned at the job site.' });
      }
      setIsCheckInOpen(false);
      setSelectedEmployee('');
      setSelectedJob('');
    } catch {
      toast({ title: 'Check-in failed', variant: 'destructive' });
    } finally {
      setCheckingIn(false);
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
            now - new Date(loc.last_updated).getTime() > STALE_AFTER_HOURS * 60 * 60 * 1000;
          return isStale ? { ...loc, status: 'Off Duty' as typeof loc.status } : loc;
        }),
    [workerLocations, now]
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
      const fresh = freshnessOf(location?.last_updated, now);
      // A check-in recorded with no coordinates is "location unknown", shown
      // honestly rather than pinned anywhere
      const noFix = !!location && (location.lat == null || location.lng == null);

      return {
        id: emp.id,
        employeeId: emp.id,
        employeeName: emp.name,
        status: liveStatus,
        isStale,
        jobTitle: jobData?.title || null,
        checkInTime: stamp
          ? isStale
            ? `Last seen ${format(new Date(stamp), 'EEE d MMM')}`
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
        fresh,
        noFix,
      };
    });
  }, [employees, workerLocations, now]);

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
        (activeTab === 'onleave' && c.status === 'On Leave') ||
        (activeTab === 'away' && (c.status === 'Off Duty' || c.status === 'On Leave'));
      return matchesSearch && matchesTab;
    });
  }, [workerCheckIns, searchQuery, activeTab]);

  const totalWorkers = workerCheckIns.length;

  // The hero reports the NEWEST real position across the team, not when the
  // page last refetched: "Updated just now" was green with every row hours old.
  const newestFresh = useMemo(() => {
    const ages = workerCheckIns
      .map((c) => c.fresh)
      .filter((f): f is Freshness => !!f)
      .sort((a, b) => a.ageMs - b.ageMs);
    return ages[0] ?? null;
  }, [workerCheckIns]);
  const heroLive =
    newestFresh && newestFresh.tone
      ? {
          label: `Latest position ${inLine(newestFresh.label)}`,
          tone: newestFresh.tone === 'emerald' ? ('green' as Tone) : newestFresh.tone,
        }
      : undefined;

  const isLoading = employeesLoading || locationsLoading;

  // Live "Before you start" lines for the help (ELE-1980).
  const activeTeam = employees.filter((e) => (e.status || '').toLowerCase() !== 'archived');
  const helpBlockers: HelpBlocker[] = [];
  if (!isLoading && activeTeam.length === 0) {
    helpBlockers.push({
      text: 'Nobody on the team yet, so there is no one to track.',
      fixLabel: 'Open the team',
      onFix: () => navigate('/employer?section=team'),
    });
  } else if (!isLoading && workerLocations.length === 0) {
    helpBlockers.push({
      text: 'Nobody has set a status yet. Workers show here once they pick one in Worker Tools, Status, with their location on for On site and En route.',
    });
  }
  const helpAsk = { page: 'tracking', tab: isMobile ? `${viewMode}:${activeTab}` : activeTab };

  // One live line: who is out, then how fresh the newest real position is
  // (from the data's own timestamp, never the refetch time: ELE-1956).
  const out = [
    statusCounts.onSite > 0 ? `${statusCounts.onSite} on site` : null,
    statusCounts.enRoute > 0 ? `${statusCounts.enRoute} travelling` : null,
    statusCounts.office > 0 ? `${statusCounts.office} in the office` : null,
  ].filter(Boolean);
  const freshLine = heroLive
    ? `${heroLive.label}.`
    : newestFresh
      ? `No live positions, last one ${inLine(newestFresh.label)}.`
      : 'No positions yet.';
  const liveLine = isLoading
    ? 'Where the team is right now.'
    : locationsFailed
      ? 'Positions did not load, so this may be out of date. Pull down or tap refresh.'
    : totalWorkers === 0
      ? 'Nobody on the team to track yet.'
      : `${out.length ? out.join(', ') : 'Nobody checked in'}. ${freshLine}`;

  // How fresh a position is, in words. Only a live one (under an hour) gets
  // colour: a solid yellow dot. Older ones are plain white, not a rainbow.
  const fresh = (f: Freshness | null) =>
    f ? (
      f.tone === 'emerald' ? (
        <span className="inline-flex items-center gap-1.5 text-white">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
          Live, {inLine(f.label)}
        </span>
      ) : (
        <span className="text-white">
          {f.tone ? `Position ${inLine(f.label)}` : `Last position ${f.label}`}
        </span>
      )
    ) : null;

  const showList = !isMobile || viewMode === 'list';
  const showMap = !isMobile || viewMode === 'map';

  // The person picked on the list or the map (by employee). The map moves to
  // them and their row opens with the rest of what you can do.
  const picked = workerCheckIns.find((c) => c.id === pickedId) ?? null;
  const pickedHasPos = !!picked && picked.lat != null && picked.lng != null && !picked.noFix;
  const pick = (id: string | null) => setPickedId((cur) => (cur === id ? null : id));
  const onMapPick = (locationId: string | null) => {
    const who = locationId ? workerCheckIns.find((c) => c.locationId === locationId) : null;
    setPickedId(who?.id ?? null);
    if (who && !isMobile) {
      document.getElementById(`trk-${who.id}`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  };

  // Job sites on the map: today's work (active or pending), plus any job
  // someone is checked in to. Finished, cancelled and template jobs stay off,
  // or a firm with a year of history gets a map full of old pins.
  const liveJobIds = new Set(mapLocations.map((l) => l.job_id).filter(Boolean));
  const mapJobs = jobsData.filter(
    (j) =>
      !j.is_template &&
      !j.archived_at &&
      (j.status === 'Active' || j.status === 'Pending' || liveJobIds.has(j.id))
  );

  // The map shows whoever the list shows, so a filter reads the same on both
  const shownIds = new Set(filteredCheckIns.map((c) => c.id));
  const shownOnMap = mapLocations.filter((l) => shownIds.has(l.employee_id));

  // A card filters the list; tapping it again shows everyone
  const filterTo = (tab: string) => setActiveTab((cur) => (cur === tab ? 'all' : tab));
  const notWorking = statusCounts.offDuty + statusCounts.onLeave;
  const peopleOut = statusCounts.onSite + statusCounts.enRoute + statusCounts.office;

  const FILTER_WORDS: Record<string, string> = {
    onsite: 'on site',
    enroute: 'travelling',
    office: 'in the office',
    away: 'not working',
    offduty: 'off duty',
    onleave: 'on leave',
  };

  const badge = (c: (typeof workerCheckIns)[number], size: 'md' | 'lg' = 'md') => {
    const ring = !!STATUS_RING[c.status];
    return (
      <span
        aria-hidden
        className={cn(
          'flex shrink-0 items-center justify-center rounded-full font-bold tracking-tight',
          size === 'lg' ? 'h-12 w-12 text-[14px]' : 'h-10 w-10 text-[12.5px]'
        )}
        style={{
          background: ring ? '#141414' : (STATUS_COLOURS[c.status] ?? STATUS_COLOURS['Off Duty']),
          color: statusInk(c.status),
          boxShadow: ring ? 'inset 0 0 0 2px #fff' : undefined,
        }}
      >
        {(c.avatar || initialsOf(c.employeeName)).slice(0, 3).toUpperCase()}
      </span>
    );
  };

  const whenLine = (c: (typeof workerCheckIns)[number]) =>
    c.checkInTime
      ? c.isStale
        ? c.checkInTime // already reads "Last seen Tue 15 Jan"
        : `Checked in ${c.checkInTime}`
      : 'No check-in today';

  // Any open row can be closed: On Site, En Route and Office are live shifts,
  // and stale rows (forgotten check-outs) especially need it
  const canCheckOutOf = (c: (typeof workerCheckIns)[number]) =>
    !!c.locationId && (['On Site', 'En Route', 'Office'].includes(c.status) || c.isStale);

  const contactButtons = (c: (typeof workerCheckIns)[number]) => (
    <>
      {c.phone && (
        <button
          type="button"
          onClick={() => handleCall(c.phone!)}
          className={rowIconBtn}
          aria-label={`Call ${c.employeeName}`}
        >
          <Phone className="h-4 w-4" />
        </button>
      )}
      <button
        type="button"
        onClick={() => handleMessage(c.employeeId, c.employeeName)}
        className={rowIconBtn}
        aria-label={`Message ${c.employeeName}`}
      >
        <MessageSquare className="h-4 w-4" />
      </button>
    </>
  );

  const checkOutButton = (c: (typeof workerCheckIns)[number]) =>
    canCheckOutOf(c) ? (
      <button
        type="button"
        // Two taps: the first asks, the second ends their shift. One stray tap
        // on a phone must not clock someone off site.
        onClick={() => {
          if (confirmOutId === c.id) {
            setConfirmOutId(null);
            handleCheckOut(c.locationId!, c.employeeName);
          } else {
            setConfirmOutId(c.id);
          }
        }}
        disabled={checkOutMutation.isPending}
        className={cn(
          'inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl border px-3.5 text-[13px] font-semibold touch-manipulation disabled:opacity-50',
          confirmOutId === c.id
            ? 'border-white bg-white text-black'
            : 'border-white/[0.14] bg-white/[0.04] text-white hover:bg-white/[0.08]'
        )}
      >
        <LogOut className="h-4 w-4" />
        {confirmOutId === c.id ? `Yes, check ${c.employeeName.split(' ')[0]} out` : 'Check out'}
      </button>
    ) : null;

  const content = (
    <PageFrame className={frameClass}>
      <PageHero
        title="Worker tracking"
        description={liveLine}
        actions={
          <HeroActions>
            <HeroPrimary
              data-help="tracking.checkin"
              onClick={() => setIsCheckInOpen(true)}
              icon={<UserPlus className="h-4 w-4" />}
            >
              Check in worker
            </HeroPrimary>
            <PageHelpButton help={TRACKING_HELP} blockers={helpBlockers} askContext={helpAsk} />
            <RefreshIcon onClick={handleRefresh} spinning={locationsLoading} />
          </HeroActions>
        }
      />

      <HowItWorks help={TRACKING_HELP} blockers={helpBlockers} askContext={helpAsk} />

      <StatCards
        stats={[
          {
            label: 'On site',
            value: statusCounts.onSite,
            sub: totalWorkers > 0 ? `of ${plural(totalWorkers, 'person', 'people')}` : 'Nobody yet',
            progress: totalWorkers > 0 ? statusCounts.onSite / totalWorkers : undefined,
            selected: activeTab === 'onsite',
            onOpen: () => filterTo('onsite'),
          },
          {
            label: 'Travelling',
            value: statusCounts.enRoute,
            sub: 'On the way to a job',
            selected: activeTab === 'enroute',
            onOpen: () => filterTo('enroute'),
          },
          {
            label: 'In the office',
            value: statusCounts.office,
            sub: 'At the office',
            selected: activeTab === 'office',
            onOpen: () => filterTo('office'),
          },
          {
            label: 'Not working',
            value: notWorking,
            sub:
              statusCounts.onLeave > 0
                ? `${statusCounts.offDuty} off duty, ${statusCounts.onLeave} on leave`
                : 'Off duty now',
            selected: ['away', 'offduty', 'onleave'].includes(activeTab),
            onOpen: () => filterTo('away'),
          },
        ]}
      />

      {isLoading ? (
        <LoadingBlocks />
      ) : (
        <>
          {/* Phone: the list or the map, switched here */}
          {isMobile && (
            <Segments<'list' | 'map'>
              quiet
              items={[
                { value: 'list', label: 'List' },
                { value: 'map', label: 'Map' },
              ]}
              value={viewMode}
              onChange={(v) => {
                setViewMode(v);
                if (v === 'map') {
                  setTimeout(
                    () =>
                      document
                        .getElementById('trk-map')
                        ?.scrollIntoView({ block: 'start', behavior: 'smooth' }),
                    60
                  );
                }
              }}
            />
          )}

          {/* Desktop: the team down the left, the map as the page's main
              panel; both the same height so the page ends on one line */}
          <div className="grid gap-4 lg:grid-cols-[minmax(340px,400px)_minmax(0,1fr)] lg:items-stretch xl:gap-5">
            {showList && (
              <section
                data-help="tracking.list"
                className={cn(areaCard, 'flex min-w-0 flex-col overflow-hidden', TRACK_H)}
              >
                <div className="space-y-3 border-b border-white/[0.07] px-4 pb-3 pt-4 sm:px-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="text-[17px] font-semibold tracking-tight text-white">Team</h2>
                    <span className="text-[13px] text-white">
                      {filteredCheckIns.length === totalWorkers
                        ? plural(totalWorkers, 'person', 'people')
                        : `${filteredCheckIns.length} of ${totalWorkers}`}
                    </span>
                  </div>
                  <SearchField
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search people or jobs"
                  />
                  {activeTab !== 'all' && (
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[13px] text-white">
                        Showing people {FILTER_WORDS[activeTab] ?? activeTab}
                      </p>
                      <button
                        type="button"
                        onClick={() => setActiveTab('all')}
                        className="-my-2 h-11 shrink-0 text-[13.5px] font-semibold text-elec-yellow touch-manipulation hover:underline underline-offset-4"
                      >
                        Show everyone
                      </button>
                    </div>
                  )}
                </div>

                {filteredCheckIns.length === 0 ? (
                  <div className="flex flex-1 flex-col items-start justify-center gap-3 px-4 py-8 sm:px-5">
                    <p className="text-[15px] font-semibold text-white">
                      {searchQuery || activeTab !== 'all' ? 'Nobody matches' : 'No one to track yet'}
                    </p>
                    <p className="text-[13.5px] leading-snug text-white">
                      {searchQuery || activeTab !== 'all'
                        ? 'Clear the search or the filter to see the whole team.'
                        : 'Add your team and they show here, with where they are and what they are on.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        if (searchQuery || activeTab !== 'all') {
                          setSearchQuery('');
                          setActiveTab('all');
                        } else {
                          navigate('/employer?section=team');
                        }
                      }}
                      className="h-11 rounded-xl border border-white/[0.14] bg-white/[0.04] px-4 text-[13.5px] font-semibold text-white hover:bg-white/[0.08] touch-manipulation"
                    >
                      {searchQuery || activeTab !== 'all' ? 'Show everyone' : 'Open the team'}
                    </button>
                  </div>
                ) : (
                  <ul className="divide-y divide-white/[0.07] lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
                    {filteredCheckIns.map((c) => {
                      const on = pickedId === c.id;
                      // A check-in with no coordinates: said plainly, never
                      // pinned anywhere (ELE-1956)
                      const unknown = c.noFix && !c.isStale;
                      const hasPos = c.lat != null && c.lng != null && !c.noFix;
                      return (
                        <li
                          key={c.id}
                          id={`trk-${c.id}`}
                          className={cn(
                            'relative transition-colors',
                            on ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]'
                          )}
                        >
                          {on && (
                            <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-elec-yellow" />
                          )}
                          <div className="flex items-center gap-3 px-4 py-3 sm:px-5">
                            <button
                              type="button"
                              onClick={() => pick(c.id)}
                              aria-expanded={on}
                              className="flex min-w-0 flex-1 items-center gap-3 text-left touch-manipulation"
                            >
                              {badge(c)}
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-[15px] font-semibold leading-snug text-white">
                                  {c.employeeName}
                                </span>
                                <span className="mt-0.5 block truncate text-[13px] text-white">
                                  <span className="font-medium">
                                    {STATUS_LABEL[c.status] ?? c.status}
                                  </span>
                                  {c.jobTitle && ` · ${c.jobTitle}`}
                                </span>
                                <span className="mt-0.5 block truncate text-[12.5px] text-white">
                                  {c.fresh ? fresh(c.fresh) : whenLine(c)}
                                  {unknown && ' · Location unknown'}
                                </span>
                              </span>
                            </button>
                            {/* Call and message on both form factors: a phone
                                is where calling a worker matters most */}
                            <div className="flex shrink-0 items-center gap-2">{contactButtons(c)}</div>
                          </div>
                          {on && (
                            <div className="flex flex-wrap items-center gap-2 px-4 pb-3.5 pl-[4.25rem] sm:px-5 sm:pl-[4.75rem]">
                              <p className="w-full text-[13px] leading-snug text-white">
                                {[c.role, c.fresh ? whenLine(c) : null].filter(Boolean).join(' · ')}
                                {!hasPos && !c.isStale && '. No position to show on the map.'}
                              </p>
                              {isMobile && hasPos && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setViewMode('map');
                                    // Land on the map, not wherever the list was scrolled to
                                    setTimeout(
                                      () =>
                                        document
                                          .getElementById('trk-map')
                                          ?.scrollIntoView({ block: 'start', behavior: 'smooth' }),
                                      60
                                    );
                                  }}
                                  className="h-11 rounded-xl bg-elec-yellow px-4 text-[13px] font-semibold text-black touch-manipulation"
                                >
                                  See on the map
                                </button>
                              )}
                              {checkOutButton(c)}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </section>
            )}

            {showMap && (
              <section
                id="trk-map"
                className={cn(areaCard, 'flex min-w-0 scroll-mt-28 flex-col overflow-hidden', TRACK_H)}
              >
                <div className="flex min-h-[56px] items-center gap-3 border-b border-white/[0.07] px-4 sm:px-5">
                  <h2 className="text-[17px] font-semibold tracking-tight text-white">Map</h2>
                  <span className="min-w-0 flex-1 truncate text-[13px] text-white">
                    {plural(
                      shownOnMap.filter((l) => l.lat != null && l.lng != null).length,
                      'person',
                      'people'
                    )}{' '}
                    and {plural(mapJobs.filter((j) => j.lat != null && j.lng != null).length, 'job site', 'job sites')}
                  </span>
                </div>
                <GoogleMapsProvider>
                  <LiveWorkerMap
                    className="flex min-h-0 flex-1 flex-col"
                    mapClassName="h-[58vh] min-h-[340px] lg:h-auto lg:min-h-0 lg:flex-1"
                    workerLocations={shownOnMap}
                    jobs={mapJobs}
                    officeLocation={officeLocation}
                    onRefresh={handleRefresh}
                    isLoading={locationsLoading || jobsLoading}
                    hideSummary
                    selectedWorkerId={pickedHasPos ? (picked!.locationId ?? null) : null}
                    onSelectWorker={onMapPick}
                    overlay={
                      isMobile && picked ? (
                        <div className="rounded-2xl border border-white/[0.14] bg-[#141414]/95 p-3.5 shadow-2xl backdrop-blur">
                          <div className="flex items-center gap-3">
                            {badge(picked)}
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[15px] font-semibold text-white">
                                {picked.employeeName}
                              </p>
                              <p className="truncate text-[12.5px] text-white">
                                {STATUS_LABEL[picked.status] ?? picked.status}
                                {picked.jobTitle && ` · ${picked.jobTitle}`}
                              </p>
                              <p className="truncate text-[12.5px] text-white">
                                {picked.fresh ? fresh(picked.fresh) : whenLine(picked)}
                              </p>
                            </div>
                            <button
                              type="button"
                              aria-label="Close"
                              onClick={() => setPickedId(null)}
                              className="-mr-1.5 -mt-6 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/[0.08] touch-manipulation"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            {contactButtons(picked)}
                            {checkOutButton(picked)}
                          </div>
                        </div>
                      ) : undefined
                    }
                    emptyNote={
                      peopleOut === 0 ? (
                        <>
                          <p className="font-semibold">Nobody is out right now</p>
                          <p className="mt-1">
                            People appear here when they set On site or En route in Worker Tools,
                            or when you check them in to a job.
                          </p>
                        </>
                      ) : !shownOnMap.some((l) => l.lat != null && l.lng != null) ? (
                        <p>Nobody in this view has a position on the map.</p>
                      ) : undefined
                    }
                  />
                </GoogleMapsProvider>
              </section>
            )}
          </div>

        </>
      )}

      <FormSheet
        open={isCheckInOpen}
        onOpenChange={setIsCheckInOpen}
        width="wide"
        title="Check in worker"
        description="Record a worker's arrival at a job site. They are pinned at the job's address, never at your own location."
        bodyClassName="grid gap-5 lg:grid-cols-2 lg:items-start"
        footer={
          <PrimaryButton
            data-help="tracking.checkin-go"
            onClick={handleCheckIn}
            disabled={!selectedEmployee || !selectedJob || checkingIn}
            fullWidth
          >
            {checkingIn && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
            Check in to site
          </PrimaryButton>
        }
      >
        {/* One tap each: the people and the jobs as lists, not two dropdowns
            hiding everything until opened */}
        <div className="min-w-0">
          <div className="mb-2.5 flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-white">Who</h3>
            <span className="text-[13px] text-white">{plural(checkInPeople.length, 'person', 'people')}</span>
          </div>
          {checkInPeople.length > 8 && (
            <div className="mb-2.5">
              <SearchField value={pickWorkerQ} onChange={setPickWorkerQ} placeholder="Find a person" />
            </div>
          )}
          {checkInPeople.length === 0 ? (
            <p className="text-[13.5px] text-white">Nobody active on the team yet.</p>
          ) : (
            <div className="space-y-2 lg:max-h-[52vh] lg:overflow-y-auto lg:pr-1">
              {checkInPeople
                .filter((e) => e.name.toLowerCase().includes(pickWorkerQ.toLowerCase()))
                .map((e) => {
                  const on = selectedEmployee === e.id;
                  const now_ = workerCheckIns.find((c) => c.id === e.id);
                  return (
                    <button
                      key={e.id}
                      type="button"
                      onClick={() => setSelectedEmployee(e.id)}
                      aria-pressed={on}
                      className={choiceRow(on)}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14.5px] font-semibold">{e.name}</span>
                        <span className="block truncate text-[12.5px]">
                          {now_
                            ? `${STATUS_LABEL[now_.status] ?? now_.status}${now_.jobTitle ? ` · ${now_.jobTitle}` : ''}`
                            : e.team_role}
                        </span>
                      </span>
                      {on && <Check className="h-5 w-5 shrink-0" aria-hidden />}
                    </button>
                  );
                })}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <div className="mb-2.5 flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-white">Which job</h3>
            <span className="text-[13px] text-white">{plural(checkInJobs.length, 'job', 'jobs')}</span>
          </div>
          {checkInJobs.length > 6 && (
            <div className="mb-2.5">
              <SearchField value={pickJobQ} onChange={setPickJobQ} placeholder="Find a job, client or address" />
            </div>
          )}
          {checkInJobs.length === 0 ? (
            <div className="space-y-3">
              <p className="text-[13.5px] leading-snug text-white">
                No active or pending jobs to check in to. Start a job and it shows here.
              </p>
              <button
                type="button"
                onClick={() => navigate('/employer?section=jobs')}
                className="h-11 rounded-xl border border-white/[0.14] bg-white/[0.04] px-4 text-[13.5px] font-semibold text-white hover:bg-white/[0.08] touch-manipulation"
              >
                Open jobs
              </button>
            </div>
          ) : (
            <div className="space-y-2 lg:max-h-[52vh] lg:overflow-y-auto lg:pr-1">
              {checkInJobs
                .filter((j) =>
                  [j.title, j.client, j.location]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase()
                    .includes(pickJobQ.toLowerCase())
                )
                .map((j) => {
                  const on = selectedJob === j.id;
                  return (
                    <button
                      key={j.id}
                      type="button"
                      onClick={() => setSelectedJob(j.id)}
                      aria-pressed={on}
                      className={choiceRow(on)}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14.5px] font-semibold">{j.title}</span>
                        <span className="block truncate text-[12.5px]">
                          {[j.client, j.location?.trim()].filter(Boolean).join(' · ') || 'No address'}
                        </span>
                      </span>
                      {on && <Check className="h-5 w-5 shrink-0" aria-hidden />}
                    </button>
                  );
                })}
            </div>
          )}
        </div>

        {checkInJob && (
          <div className={cn(panel, 'px-4 py-3.5 sm:px-5 lg:col-span-2')}>
            <p className="text-[13px] font-semibold text-white">Where they pin</p>
            <p className="mt-0.5 break-words text-[14px] leading-snug text-white">
              {checkInJob.lat != null && checkInJob.lng != null
                ? `Pins at ${checkInJob.location?.trim() || 'the job site'}`
                : canGeocode(checkInJob.location)
                  ? `Pins at ${checkInJob.location.trim()}. We'll find it on the map and save it to the job.`
                  : checkInJob.location?.trim()
                    ? `"${checkInJob.location.trim()}" has no postcode, so the check-in is recorded with the location unknown. Add the postcode to the job to pin it.`
                    : 'This job has no address, so the check-in is recorded with the location unknown. Add an address with its postcode to pin it.'}
            </p>
          </div>
        )}
      </FormSheet>

      {/* Message composer, replacing window.prompt */}
      <FormSheet
        open={!!messageTarget}
        onOpenChange={(open) => !open && setMessageTarget(null)}
        width="wide"
        title={`Message ${messageTarget?.name ?? ''}`}
        description="Lands in their Worker Tools comms with a push notification."
        footer={
          <PrimaryButton
            onClick={sendWorkerMessage}
            disabled={!messageText.trim() || isSending}
            fullWidth
          >
            {isSending ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : null}
            Send message
          </PrimaryButton>
        }
      >
        <textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message"
          rows={5}
          autoFocus
          aria-label="Message"
          className={textareaClass}
        />
      </FormSheet>
    </PageFrame>
  );

  return isMobile ? <PullToRefresh onRefresh={handleRefresh}>{content}</PullToRefresh> : content;
}
