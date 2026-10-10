/**
 * CrewOnSitePanel — Worker Tools › My Jobs › a job (ELE-1827).
 *
 * "Who's where" from the worker's side. Andrew, 8 Oct: a worker sees the
 * colleagues on the SAME job, today only, and only while they are clocked in
 * on it. Nobody but the office sees the whole team.
 *
 * Reads get_my_job_crew_positions, which refuses unless the caller is on this
 * job today and only returns a position for someone clocked in (under 12 hours
 * old, written since they clocked in). No phone, email or address comes back.
 *
 * When the RPC refuses (the job isn't on today) the plain "Also on this job"
 * list from get_my_job_detail is shown instead, as before.
 *
 * Offline (ELE-1828): the last copy is kept on the phone. With no signal the
 * panel shows that copy with the time it was taken, and the list only: the
 * map tiles need the network.
 */
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import { Navigation } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { GoogleMapsProvider } from '@/contexts/GoogleMapsContext';
import { LiveWorkerMap } from '@/components/employer/LiveWorkerMap';
import type { WorkerLocationWithEmployee } from '@/services/locationService';
import type { Job } from '@/services/jobService';
import type { JobCrewMember } from '@/hooks/useWorkerJobSite';
import { OFFLINE_FIRST, offlineSnapshot, snapshotAge } from '@/lib/workerOfflineCache';
import { navigateToAddress, canNavigateTo } from '@/utils/navigate-to-address';
import { SectionTitle, SolidBadge, WorkerPanel } from '@/components/worker-tools/WorkerUi';

interface CrewPosition {
  employee_id: string;
  name: string;
  initials: string;
  role: string | null;
  role_on_job: string | null;
  finished_at: string | null;
  clocked_in_at: string | null;
  lat: number | string | null;
  lng: number | string | null;
  position_at: string | null;
}

interface CrewPositions {
  job: {
    id: string;
    title: string;
    address: string | null;
    lat: number | string | null;
    lng: number | string | null;
  };
  me: {
    clocked_in_at: string | null;
    lat: number | string | null;
    lng: number | string | null;
    position_at: string | null;
  } | null;
  crew: CrewPosition[];
}

const toNum = (v: unknown): number | null => {
  const n = typeof v === 'string' ? Number(v) : (v as number | null);
  return typeof n === 'number' && Number.isFinite(n) ? n : null;
};

const timeOf = (iso: string) => format(parseISO(iso), 'HH:mm');

/** The read, plus when the copy was taken if it came from the phone. */
interface CrewRead {
  positions: CrewPositions;
  copyAt: string | null;
}

function useCrewPositions(jobId: string) {
  return useQuery<CrewRead>({
    queryKey: ['my-job-crew-positions', jobId],
    ...OFFLINE_FIRST,
    queryFn: async () => {
      const key = `my-job-crew-positions:${jobId}`;
      let live = false;
      const positions = await offlineSnapshot(key, async () => {
        const { data, error } = await supabase.rpc(
          'get_my_job_crew_positions' as never,
          { p_job: jobId } as never
        );
        if (error) throw error;
        live = true;
        return data as unknown as CrewPositions;
      });
      return { positions, copyAt: live ? null : snapshotAge(key) };
    },
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: true,
    retry: false,
  });
}

/** navigator.onLine, kept current. */
function useOnline() {
  const [online, setOnline] = useState(
    typeof navigator === 'undefined' ? true : navigator.onLine !== false
  );
  useEffect(() => {
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    window.addEventListener('online', up);
    window.addEventListener('offline', down);
    return () => {
      window.removeEventListener('online', up);
      window.removeEventListener('offline', down);
    };
  }, []);
  return online;
}

/**
 * Whether the element is actually laid out. The job page renders a phone and
 * a desktop layout and hides one with CSS; only the shown copy loads a map.
 */
function useShown() {
  // A callback ref: the panel mounts after the read lands, not on first render.
  const [el, setEl] = useState<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!el) return;
    const check = () => setShown(el.getClientRects().length > 0);
    check();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [el]);
  return [setEl, shown] as const;
}

const copyTime = (iso: string) => {
  const d = parseISO(iso);
  return format(d, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
    ? format(d, 'HH:mm')
    : format(d, 'EEE d MMM, HH:mm');
};

/** A crew member as the office map's marker shape. */
function asMapLocation(
  id: string,
  name: string,
  initials: string,
  lat: number,
  lng: number,
  at: string,
  jobId: string
): WorkerLocationWithEmployee {
  return {
    id,
    employee_id: id,
    job_id: jobId,
    lat,
    lng,
    accuracy: null,
    status: 'On Site',
    checked_in_at: null,
    checked_out_at: null,
    last_updated: at,
    created_at: at,
    employees: { name, avatar_initials: initials } as WorkerLocationWithEmployee['employees'],
    jobs: null,
  };
}

export function CrewOnSitePanel({
  jobId,
  fallbackCrew,
}: {
  jobId: string;
  /** Others on the job from get_my_job_detail — shown when the job isn't on today. */
  fallbackCrew: JobCrewMember[];
}) {
  const { data: read, isError, isLoading, dataUpdatedAt } = useCrewPositions(jobId);
  const data = read?.positions;
  const online = useOnline();
  const [shownRef, shown] = useShown();
  // From the phone's copy: the read fell back to it, or the signal went after
  // the last live read (then that read is the copy).
  const copyAt =
    read?.copyAt ?? (!online && dataUpdatedAt ? new Date(dataUpdatedAt).toISOString() : null);
  const fromCopy = !!copyAt || !online;

  const mapData = useMemo(() => {
    if (!data) return null;
    const jobLat = toNum(data.job.lat);
    const jobLng = toNum(data.job.lng);
    const people: WorkerLocationWithEmployee[] = [];
    for (const c of data.crew) {
      const lat = toNum(c.lat);
      const lng = toNum(c.lng);
      if (lat != null && lng != null && c.position_at) {
        people.push(
          asMapLocation(c.employee_id, c.name, c.initials, lat, lng, c.position_at, jobId)
        );
      }
    }
    const meLat = toNum(data.me?.lat);
    const meLng = toNum(data.me?.lng);
    if (meLat != null && meLng != null && data.me?.position_at) {
      people.push(asMapLocation('me', 'You', 'You', meLat, meLng, data.me.position_at, jobId));
    }
    const jobs =
      jobLat != null && jobLng != null
        ? [
            {
              id: data.job.id,
              title: data.job.title,
              client: '',
              location: data.job.address ?? '',
              lat: jobLat,
              lng: jobLng,
            } as unknown as Job,
          ]
        : [];
    return { people, jobs, jobLat, jobLng };
  }, [data, jobId]);

  // Not on today (or offline): the plain list, as the page always had.
  if (isLoading) return null;
  if (isError || !data || !mapData) {
    if (fallbackCrew.length === 0) return null;
    return <PlainCrewList crew={fallbackCrew} />;
  }

  const crew = data.crew;
  const clockedIn = crew.filter((c) => c.clocked_in_at).length;
  const hasMap = online && (mapData.people.length > 0 || mapData.jobs.length > 0);
  const canNavigate = canNavigateTo({
    address: data.job.address,
    latitude: mapData.jobLat,
    longitude: mapData.jobLng,
  });

  return (
    <div ref={shownRef} data-help="wt-jobs.crew">
      <SectionTitle
        title="Crew on site"
        right={
          crew.length > 0 ? (
            <span className="text-[13px] text-white">
              {clockedIn === 0
                ? 'Nobody else clocked in'
                : clockedIn === 1
                  ? '1 clocked in'
                  : `${clockedIn} clocked in`}
            </span>
          ) : undefined
        }
      />
      <WorkerPanel className="overflow-hidden">
        {fromCopy && (
          <div className="border-b border-white/[0.07] px-4 py-3 sm:px-5">
            <p className="text-[13px] font-semibold text-white">
              {copyAt ? `No signal. This is the copy from ${copyTime(copyAt)}` : 'No signal'}
            </p>
            <p className="mt-0.5 text-[12.5px] text-white">
              Who is clocked in may have changed since. The map comes back with the signal.
            </p>
          </div>
        )}
        {crew.length === 0 ? (
          <div className="px-4 py-3.5 sm:px-5">
            <p className="text-[14.5px] font-semibold text-white">Just you on this job today</p>
            <p className="mt-0.5 text-[13px] text-white">
              If the office books someone else on, they show here.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-white/[0.07]">
            {crew.map((c) => {
              const placed = toNum(c.lat) != null && toNum(c.lng) != null;
              const detail = [
                c.role_on_job || c.role,
                c.finished_at
                  ? `Finished their part at ${timeOf(c.finished_at)}`
                  : c.clocked_in_at
                    ? `Clocked in at ${timeOf(c.clocked_in_at)}${
                        placed && c.position_at
                          ? `, last seen ${timeOf(c.position_at)}`
                          : ', no position yet'
                      }`
                    : 'Not clocked in',
              ]
                .filter(Boolean)
                .join(' · ');
              return (
                <li
                  key={c.employee_id}
                  className="flex min-h-[56px] items-center justify-between gap-3 px-4 py-3 sm:px-5"
                >
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-white">{c.name}</p>
                    <p className="mt-0.5 text-[12.5px] text-white">{detail}</p>
                  </div>
                  {c.finished_at ? (
                    <SolidBadge tone="green">Done</SolidBadge>
                  ) : c.clocked_in_at ? (
                    <SolidBadge tone="neutral">Clocked in</SolidBadge>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}

        {hasMap && shown && (
          <div className="border-t border-white/[0.07]">
            <GoogleMapsProvider>
              <LiveWorkerMap
                workerLocations={mapData.people}
                jobs={mapData.jobs}
                mapClassName="h-[260px] sm:h-[320px]"
                compactLegend
                hideSummary
              />
            </GoogleMapsProvider>
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-white/[0.07] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="text-[12.5px] leading-relaxed text-white">
            You see people on this job only while they are clocked in on it, and they see you the
            same way. Off the clock nobody’s position is shown.
          </p>
          {canNavigate && (
            <button
              type="button"
              onClick={() =>
                navigateToAddress({
                  address: data.job.address,
                  latitude: mapData.jobLat,
                  longitude: mapData.jobLng,
                })
              }
              className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-white/[0.18] px-4 text-[13px] font-semibold text-white touch-manipulation"
            >
              <Navigation className="h-4 w-4" />
              Directions to site
            </button>
          )}
        </div>
      </WorkerPanel>
    </div>
  );
}

/** The list the job page always had, for days the job isn't on. */
function PlainCrewList({ crew }: { crew: JobCrewMember[] }) {
  return (
    <div>
      <SectionTitle title="Also on this job" />
      <WorkerPanel className="divide-y divide-white/[0.07]">
        {crew.map((c, i) => (
          <div
            key={`${c.name}-${i}`}
            className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5"
          >
            <div className="min-w-0">
              <p className="text-[14.5px] font-semibold text-white">{c.name}</p>
              {c.role_on_job && <p className="text-[12.5px] text-white">{c.role_on_job}</p>}
            </div>
            {c.finished_at ? (
              <SolidBadge tone="green">Done {timeOf(c.finished_at)}</SolidBadge>
            ) : (
              <SolidBadge tone="neutral">On it</SolidBadge>
            )}
          </div>
        ))}
      </WorkerPanel>
    </div>
  );
}
