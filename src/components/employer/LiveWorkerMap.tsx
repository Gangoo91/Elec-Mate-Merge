import { useState, useCallback, useEffect, useMemo, useRef, type ReactNode } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { RefreshCw, Plus, Minus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { plural } from '@/components/employer/pageParts/PageParts';
import { useGoogleMaps } from '@/contexts/GoogleMapsContext';
import type { WorkerLocationWithEmployee } from '@/services/locationService';
import type { Job } from '@/services/jobService';
import type { OfficeLocation } from '@/services/settingsService';
import { STATUS_COLOURS, STATUS_RING, statusInk } from './trackingColours';

interface LiveWorkerMapProps {
  workerLocations: WorkerLocationWithEmployee[];
  jobs: Job[];
  officeLocation?: OfficeLocation | null;
  onRefresh?: () => void;
  isLoading?: boolean;
  className?: string;
  /** Overrides the map's height classes — for a small inline map (ELE-1827). */
  mapClassName?: string;
  /** Legend shows only what an inline map can contain: job site + on site. */
  compactLegend?: boolean;
  /** Drop the "N people on the map" strip — the host panel already says it (ELE-1827). */
  hideSummary?: boolean;
  /**
   * The host owns the selected person (the tracking page shows their card with
   * Call and Message). Given, a marker tap reports the location id here and the
   * map moves to whoever is selected; the map draws no card of its own for them.
   */
  selectedWorkerId?: string | null;
  onSelectWorker?: (locationId: string | null) => void;
  /** The host's own card, laid along the bottom of the map (the picked person on a phone). */
  overlay?: ReactNode;
  /** Laid over the top of the map while given, e.g. "Nobody is out right now". */
  emptyNote?: ReactNode;
}

const LEGEND_LABEL: Record<string, string> = {
  'On Site': 'On site',
  'En Route': 'Travelling',
  Office: 'Office',
  'On Leave': 'On leave',
  'Off Duty': 'Off duty',
};

/**
 * A usable position: both parts present and finite. Not truthiness: longitude
 * 0 is the Greenwich meridian through east London, a real place (ELE-1956),
 * and a check-in with no fix is stored as null and must never pin anywhere.
 */
const hasPos = (p?: { lat?: number | null; lng?: number | null } | null): boolean =>
  p?.lat != null &&
  p?.lng != null &&
  Number.isFinite(Number(p.lat)) &&
  Number.isFinite(Number(p.lng));

// Default centre - Manchester
const DEFAULT_CENTER = { lat: 53.4808, lng: -2.2426 };

/**
 * The app's own dark map: neutral greys that sit on the app's near-black,
 * roads you can read, water a shade darker, and no shop or bus-stop clutter
 * competing with the people and the job sites.
 */
const darkMapStyles: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#1c1c1e' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8e8e93' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1c1c1e' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#3a3a3c' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#c7c7cc' }],
  },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ visibility: 'on' }, { color: '#1f2420' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2c2c2e' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#18181a' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#98989d' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#3a3a3c' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#1c1c1e' }] },
  { featureType: 'road.local', elementType: 'labels', stylers: [{ visibility: 'simplified' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0d1014' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#4a4f57' }] },
];

const svgUrl = (svg: string) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

/** A person: a round badge with their initials, in their status colour. */
function personIcon(
  initials: string,
  status: string,
  selected: boolean,
  offset: { x: number; y: number } = { x: 0, y: 0 }
): google.maps.Icon {
  const size = selected ? 52 : 40;
  const c = size / 2;
  const r = selected ? 17 : 16;
  const ring = !!STATUS_RING[status];
  const fill = ring ? '#141414' : (STATUS_COLOURS[status] ?? STATUS_COLOURS['Off Duty']);
  const stroke = ring ? '#ffffff' : '#0a0a0a';
  const text = (initials || '?').replace(/[^A-Za-z0-9]/g, '').slice(0, 3).toUpperCase() || '?';
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
    (selected
      ? `<circle cx="${c}" cy="${c}" r="${c - 1.5}" fill="rgba(255,255,255,0.14)" stroke="#ffffff" stroke-width="2"/>`
      : '') +
    `<circle cx="${c}" cy="${c}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${ring ? 2.5 : 2}"/>` +
    `<text x="${c}" y="${c + 4.2}" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif" font-size="12" font-weight="700" fill="${statusInk(status)}">${text}</text>` +
    `</svg>`;
  return {
    url: svgUrl(svg),
    scaledSize: new google.maps.Size(size, size),
    // The anchor is the point of the badge that sits on the position, so
    // moving it the other way shifts the badge by `offset`
    anchor: new google.maps.Point(c - offset.x, c - offset.y),
  };
}

/** Positions this close (about 10 m) are the same place on the map. */
const placeKey = (lat: number, lng: number) => `${lat.toFixed(4)},${lng.toFixed(4)}`;
/** Badges in a row, just clear of each other so every face reads. */
const STACK_STEP = 34;
/** Lifts a badge clear of a job pin so the pin, and what it is, stay visible. */
const ABOVE_PIN = -50;

/** A place: a pin. Job sites are dark with a white mark, the office is white. */
function placeIcon(kind: 'job' | 'office'): google.maps.Icon {
  const fill = kind === 'job' ? '#1c1c1e' : '#ffffff';
  const edge = kind === 'job' ? '#ffffff' : '#0a0a0a';
  const mark = kind === 'job' ? '#ffffff' : '#0a0a0a';
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="38" viewBox="0 0 30 38">` +
    `<path d="M15 36.5C15 36.5 3 23.6 3 14.6 3 7.9 8.4 2.5 15 2.5S27 7.9 27 14.6C27 23.6 15 36.5 15 36.5Z" fill="${fill}" stroke="${edge}" stroke-width="2"/>` +
    (kind === 'job'
      ? `<rect x="10.5" y="10.2" width="9" height="9" rx="1.6" fill="${mark}"/>`
      : `<path d="M9.5 15.6 15 10.8l5.5 4.8V20h-11z" fill="${mark}"/>`) +
    `</svg>`;
  return {
    url: svgUrl(svg),
    scaledSize: new google.maps.Size(30, 38),
    anchor: new google.maps.Point(15, 37),
  };
}

type Picked =
  | { kind: 'job'; job: Job }
  | { kind: 'office' }
  | { kind: 'worker'; loc: WorkerLocationWithEmployee }
  | null;

const ctrlBtn =
  'flex h-11 w-11 items-center justify-center bg-[#141414]/95 text-white backdrop-blur ' +
  'hover:bg-[#232325] touch-manipulation disabled:opacity-50';

export function LiveWorkerMap({
  workerLocations,
  jobs,
  officeLocation,
  onRefresh,
  isLoading,
  className,
  mapClassName,
  compactLegend,
  hideSummary,
  selectedWorkerId,
  onSelectWorker,
  emptyNote,
  overlay,
}: LiveWorkerMapProps) {
  const heightCn =
    mapClassName ??
    'h-[45vh] min-h-[300px] sm:h-[400px] lg:h-[calc(100vh-14rem)] lg:min-h-[420px] lg:max-h-[720px]';
  const { isLoaded, loadError, apiKey, isLoadingKey } = useGoogleMaps();
  const [picked, setPicked] = useState<Picked>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const fitted = useRef(false);
  const controlled = !!onSelectWorker;

  const pinned = useMemo(() => workerLocations.filter(hasPos), [workerLocations]);
  const unknown = workerLocations.length - pinned.length;

  // People in the same place sit side by side instead of hiding each other,
  // and above the job pin when they are at a job, so both read at once
  const offsets = useMemo(() => {
    const jobPlaces = new Set(
      jobs.filter(hasPos).map((j) => placeKey(Number(j.lat), Number(j.lng)))
    );
    const groups = new Map<string, string[]>();
    pinned.forEach((l) => {
      const k = placeKey(Number(l.lat), Number(l.lng));
      groups.set(k, [...(groups.get(k) ?? []), l.id]);
    });
    const out = new Map<string, { x: number; y: number }>();
    groups.forEach((ids, k) => {
      const y = jobPlaces.has(k) ? ABOVE_PIN : 0;
      ids.forEach((id, i) => out.set(id, { x: (i - (ids.length - 1) / 2) * STACK_STEP, y }));
    });
    return out;
  }, [pinned, jobs]);

  const fitAll = useCallback(
    (m: google.maps.Map) => {
      const bounds = new google.maps.LatLngBounds();
      let any = false;
      const add = (p: { lat?: number | null; lng?: number | null } | null | undefined) => {
        if (hasPos(p)) {
          bounds.extend({ lat: Number(p!.lat), lng: Number(p!.lng) });
          any = true;
        }
      };
      add(officeLocation);
      pinned.forEach(add);
      jobs.forEach(add);
      if (!any) return false;
      m.fitBounds(bounds, 64);
      // One marker (or a worker on the job they are pinned to) zooms in to
      // a blank street; hold it at a street-level view instead
      google.maps.event.addListenerOnce(m, 'idle', () => {
        if ((m.getZoom() ?? 0) > 15) m.setZoom(15);
      });
      return true;
    },
    [pinned, jobs, officeLocation]
  );

  // Fit once, as soon as there is something to fit (the data can land after
  // the map has loaded). Not when the host has already picked someone: the
  // map opens on them instead (a phone switching from the list to the map).
  useEffect(() => {
    if (!map || fitted.current) return;
    if (selectedWorkerId && pinned.some((l) => l.id === selectedWorkerId)) {
      fitted.current = true;
      return;
    }
    if (fitAll(map)) fitted.current = true;
  }, [map, fitAll, selectedWorkerId, pinned]);

  // The host picked someone (a tap on their row): move the map to them
  useEffect(() => {
    if (!map || !selectedWorkerId) return;
    const loc = pinned.find((l) => l.id === selectedWorkerId);
    if (!loc) return;
    map.panTo({ lat: Number(loc.lat), lng: Number(loc.lng) });
    if ((map.getZoom() ?? 0) < 14) map.setZoom(15);
  }, [map, selectedWorkerId, pinned]);

  const statusesShown = useMemo(() => {
    const present = new Set<string>(pinned.map((l) => l.status));
    return Object.keys(LEGEND_LABEL).filter((s) =>
      compactLegend ? s === 'On Site' : present.has(s) || s === 'On Site'
    );
  }, [pinned, compactLegend]);

  // The Maps key is provided by the app (get-google-maps-key) — the user is
  // never asked for one. While it loads, show a clean placeholder.
  if (isLoadingKey || (!isLoaded && !loadError && apiKey)) {
    // Skeleton at the same height as the real map — no layout jump on load
    return (
      <div className={cn('overflow-hidden', className)}>
        <div className={cn(heightCn, 'flex animate-pulse items-center justify-center bg-[#1c1c1e]')}>
          <p className="text-[13px] text-white">Loading map…</p>
        </div>
      </div>
    );
  }

  // Loaded but no key / failed to load — don't spin forever; show a real state.
  if (loadError || !apiKey) {
    return (
      <div className={cn('overflow-hidden', className)}>
        <div className={cn(heightCn, 'flex items-center justify-center bg-[#1c1c1e] px-6')}>
          <p className="text-center text-[14px] text-white">
            The map is unavailable right now. The team list still shows where everyone is.
          </p>
        </div>
      </div>
    );
  }

  const pickedWorker =
    picked?.kind === 'worker' ? picked.loc : null;
  const card =
    picked?.kind === 'job'
      ? {
          eyebrow: 'Job site',
          title: picked.job.title,
          lines: [picked.job.client, picked.job.location].filter(Boolean) as string[],
        }
      : picked?.kind === 'office' && officeLocation
        ? { eyebrow: 'Office', title: 'Head office', lines: [officeLocation.address].filter(Boolean) as string[] }
        : pickedWorker
          ? {
              eyebrow: LEGEND_LABEL[pickedWorker.status] ?? pickedWorker.status,
              title: pickedWorker.employees?.name ?? 'Worker',
              lines: [pickedWorker.jobs?.title].filter(Boolean) as string[],
            }
          : null;

  return (
    <div className={cn('overflow-hidden', className)}>
      {!hideSummary && (
        <div className="flex min-h-[52px] items-center gap-3 border-b border-white/[0.07] px-4 sm:px-5">
          <p className="min-w-0 flex-1 truncate text-[13px] text-white">
            {plural(pinned.length, 'person', 'people')} on the map
            {unknown > 0 && `, ${unknown} location unknown`}
          </p>
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={isLoading}
              aria-label="Refresh map"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/[0.06] touch-manipulation disabled:opacity-50"
            >
              <RefreshCw className={cn('h-4 w-4', isLoading && 'animate-spin')} />
            </button>
          )}
        </div>
      )}
      {/* One-finger pan (greedy): on a phone this map is its own view */}
      <div className={cn('relative bg-[#1c1c1e]', heightCn)}>
        <GoogleMap
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={DEFAULT_CENTER}
          zoom={6}
          onLoad={setMap}
          onUnmount={() => setMap(null)}
          onClick={() => {
            setPicked(null);
            onSelectWorker?.(null);
          }}
          options={{
            styles: darkMapStyles,
            backgroundColor: '#1c1c1e',
            disableDefaultUI: true,
            clickableIcons: false,
            gestureHandling: 'greedy',
            keyboardShortcuts: false,
          }}
        >
          {hasPos(officeLocation) && (
            <Marker
              key="office"
              position={{ lat: Number(officeLocation!.lat), lng: Number(officeLocation!.lng) }}
              icon={placeIcon('office')}
              title="Head office"
              onClick={() => setPicked({ kind: 'office' })}
              zIndex={500}
            />
          )}

          {jobs.map((job) =>
            hasPos(job) ? (
              <Marker
                key={`job-${job.id}`}
                position={{ lat: Number(job.lat), lng: Number(job.lng) }}
                icon={placeIcon('job')}
                title={job.title}
                onClick={() => setPicked({ kind: 'job', job })}
                zIndex={400}
              />
            ) : null
          )}

          {/* People above places, the selected person above everyone */}
          {pinned.map((loc) => {
            const selected = controlled
              ? selectedWorkerId === loc.id
              : pickedWorker?.id === loc.id;
            return (
              <Marker
                key={`worker-${loc.id}`}
                position={{ lat: Number(loc.lat), lng: Number(loc.lng) }}
                icon={personIcon(
                  loc.employees?.avatar_initials ||
                    (loc.employees?.name ?? '')
                      .split(/\s+/)
                      .slice(0, 2)
                      .map((w) => w[0] ?? '')
                      .join(''),
                  loc.status,
                  selected,
                  offsets.get(loc.id)
                )}
                title={loc.employees?.name ?? undefined}
                zIndex={selected ? 2000 : 1000}
                onClick={() => {
                  if (controlled) {
                    setPicked(null);
                    onSelectWorker!(loc.id);
                  } else {
                    setPicked({ kind: 'worker', loc });
                  }
                }}
              />
            );
          })}
        </GoogleMap>

        {/* Nobody to show: say so on the map, plainly */}
        {emptyNote && (
          <div className="absolute left-3 right-[7.5rem] top-3 sm:left-4 sm:top-4 sm:max-w-md">
            <div className=" rounded-2xl border border-white/[0.12] bg-[#141414]/95 px-4 py-3.5 text-[13.5px] leading-snug text-white shadow-2xl backdrop-blur sm:px-5">
              {emptyNote}
            </div>
          </div>
        )}

        {/* Our own controls: dark, 44px, out of the way of the markers */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 sm:right-4 sm:top-4">
          <button
            type="button"
            onClick={() => map && fitAll(map)}
            className="h-11 rounded-full border border-white/[0.14] bg-[#141414]/95 px-4 text-[13px] font-semibold text-white shadow-lg backdrop-blur hover:bg-[#232325] touch-manipulation"
          >
            Show all
          </button>
        </div>
        <div className="absolute bottom-3 right-3 flex flex-col overflow-hidden rounded-2xl border border-white/[0.14] shadow-lg sm:bottom-4 sm:right-4">
          <button
            type="button"
            aria-label="Zoom in"
            onClick={() => map?.setZoom((map.getZoom() ?? 6) + 1)}
            className={ctrlBtn}
          >
            <Plus className="h-4 w-4" />
          </button>
          <span aria-hidden className="h-px bg-white/[0.12]" />
          <button
            type="button"
            aria-label="Zoom out"
            onClick={() => map?.setZoom((map.getZoom() ?? 6) - 1)}
            className={ctrlBtn}
          >
            <Minus className="h-4 w-4" />
          </button>
        </div>

        {/* What you tapped: a dark card in the app's own style, not Google's bubble */}
        {overlay && (
          <div className="absolute bottom-3 left-3 right-[4.25rem] sm:bottom-4 sm:left-4 sm:right-auto sm:w-[340px]">
            {overlay}
          </div>
        )}
        {card && !overlay && (
          <div className="absolute bottom-3 left-3 right-[4.25rem] sm:bottom-4 sm:left-4 sm:right-auto sm:w-[320px]">
            <div className="flex items-start gap-3 rounded-2xl border border-white/[0.14] bg-[#141414]/95 px-4 py-3.5 shadow-2xl backdrop-blur">
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-medium text-white">{card.eyebrow}</p>
                <p className="mt-0.5 truncate text-[15px] font-semibold text-white">{card.title}</p>
                {card.lines.map((l) => (
                  <p key={l} className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-white">
                    {l}
                  </p>
                ))}
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setPicked(null)}
                className="-mr-2 -mt-1.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/[0.08] touch-manipulation"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Legend below the map — an overlay covered markers on phones */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[0.07] px-4 py-3 sm:px-5">
        {statusesShown.map((status) => (
          <span key={status} className="flex items-center gap-2 text-[12.5px] text-white">
            <span
              aria-hidden
              className="h-3 w-3 rounded-full"
              style={
                STATUS_RING[status]
                  ? { background: '#141414', boxShadow: 'inset 0 0 0 2px #fff' }
                  : { background: STATUS_COLOURS[status] }
              }
            />
            {compactLegend ? 'Clocked in' : (LEGEND_LABEL[status] ?? status)}
          </span>
        ))}
        <span className="flex items-center gap-2 text-[12.5px] text-white">
          <span
            aria-hidden
            className="flex h-3.5 w-3.5 items-center justify-center rounded-[4px] bg-[#1c1c1e] ring-[1.5px] ring-white"
          >
            <span className="h-1.5 w-1.5 rounded-[1px] bg-white" />
          </span>
          Job site
        </span>
        {hasPos(officeLocation) && (
          <span className="flex items-center gap-2 text-[12.5px] text-white">
            <span aria-hidden className="h-3.5 w-3.5 rounded-[4px] bg-white" />
            Office
          </span>
        )}
        {unknown > 0 && hideSummary && (
          <span className="text-[12.5px] text-white sm:ml-auto">
            {plural(unknown, 'person', 'people')} with no location
          </span>
        )}
      </div>
    </div>
  );
}
