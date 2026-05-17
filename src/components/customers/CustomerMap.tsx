import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Customer } from '@/hooks/inspection/useCustomers';
import { GoogleMapsProvider, useGoogleMaps } from '@/contexts/GoogleMapsContext';
import { Loader2 } from 'lucide-react';

interface CustomerMapProps {
  customers: Customer[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

const GEOCODE_CACHE_KEY = 'elec-mate.customer-geocode-cache.v1';

type GeocodeCache = Record<string, { lat: number; lng: number } | 'failed'>;

const loadCache = (): GeocodeCache => {
  try {
    const raw = localStorage.getItem(GEOCODE_CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};
const saveCache = (cache: GeocodeCache) => {
  try {
    localStorage.setItem(GEOCODE_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // ignore quota errors
  }
};

interface CustomerMarker {
  customerId: string;
  position: google.maps.LatLngLiteral;
}

const MapBody: React.FC<CustomerMapProps> = ({ customers, selectedId, onSelect }) => {
  const { isLoaded, loadError } = useGoogleMaps();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<Map<string, google.maps.Marker>>(new Map());
  const [pendingGeocode, setPendingGeocode] = useState(0);
  const [markersReady, setMarkersReady] = useState<CustomerMarker[]>([]);
  const navigate = useNavigate();

  // Initialise the map exactly once after the API loads.
  useEffect(() => {
    if (!isLoaded || !mapContainerRef.current || mapInstanceRef.current) return;
    mapInstanceRef.current = new window.google.maps.Map(mapContainerRef.current, {
      center: { lat: 54.7023545, lng: -3.2765753 }, // UK centre
      zoom: 6,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true,
      styles: [
        // Dark, minimal style — fits the editorial theme.
        { elementType: 'geometry', stylers: [{ color: '#1a1a1a' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#1a1a1a' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#9a9a9a' }] },
        { featureType: 'administrative', elementType: 'geometry', stylers: [{ visibility: 'off' }] },
        { featureType: 'poi', stylers: [{ visibility: 'off' }] },
        { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2a2a2a' }] },
        { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#1a1a1a' }] },
        { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#707070' }] },
        { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0d1117' }] },
        { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#4a90c9' }] },
      ],
    });
  }, [isLoaded]);

  // Geocode customer addresses (cached) — re-runs when customer list changes.
  useEffect(() => {
    if (!isLoaded || !window.google?.maps) return;

    const cache = loadCache();
    const geocoder = new window.google.maps.Geocoder();
    const todo: Customer[] = [];
    const known: CustomerMarker[] = [];

    for (const c of customers) {
      if (!c.address) continue;
      const cached = cache[c.address];
      if (cached === 'failed') continue;
      if (cached) {
        known.push({ customerId: c.id, position: cached });
      } else {
        todo.push(c);
      }
    }

    setMarkersReady(known);
    if (todo.length === 0) return;

    setPendingGeocode(todo.length);

    let cancelled = false;
    (async () => {
      const collected: CustomerMarker[] = [...known];
      // Sequential with a tiny delay to stay under Google's per-second QPS.
      for (const c of todo) {
        if (cancelled) return;
        await new Promise<void>((resolve) => {
          geocoder.geocode({ address: `${c.address}, UK` }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
              const pos = results[0].geometry.location.toJSON();
              cache[c.address!] = pos;
              collected.push({ customerId: c.id, position: pos });
            } else {
              cache[c.address!] = 'failed';
            }
            resolve();
          });
        });
        await new Promise((r) => setTimeout(r, 100));
      }
      if (cancelled) return;
      saveCache(cache);
      setMarkersReady(collected);
      setPendingGeocode(0);
    })();

    return () => {
      cancelled = true;
    };
  }, [customers, isLoaded]);

  // Render / update markers on the map.
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google?.maps) return;

    // Remove markers no longer in the set.
    const liveIds = new Set(markersReady.map((m) => m.customerId));
    for (const [id, marker] of markersRef.current.entries()) {
      if (!liveIds.has(id)) {
        marker.setMap(null);
        markersRef.current.delete(id);
      }
    }

    // Add / update markers.
    for (const { customerId, position } of markersReady) {
      const isSelected = selectedId === customerId;
      const existing = markersRef.current.get(customerId);
      const customer = customers.find((c) => c.id === customerId);
      if (existing) {
        existing.setPosition(position);
        existing.setIcon(buildIcon(isSelected));
        existing.setZIndex(isSelected ? 999 : 1);
        continue;
      }
      const marker = new window.google.maps.Marker({
        position,
        map: mapInstanceRef.current,
        title: customer?.name,
        animation: window.google.maps.Animation.DROP,
        icon: buildIcon(isSelected),
        zIndex: isSelected ? 999 : 1,
      });
      marker.addListener('click', () => {
        onSelect(customerId);
      });
      markersRef.current.set(customerId, marker);
    }

    // Fit bounds on first batch.
    if (markersReady.length > 0 && markersRef.current.size === markersReady.length) {
      const bounds = new window.google.maps.LatLngBounds();
      markersReady.forEach((m) => bounds.extend(m.position));
      mapInstanceRef.current.fitBounds(bounds, 60);
    }
  }, [markersReady, selectedId, customers, onSelect]);

  if (loadError) {
    return (
      <div className="flex h-[60vh] items-center justify-center rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)]">
        <p className="px-6 text-center text-[13px] text-white/65">
          Map failed to load. Check your network and Google Maps key.
        </p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex h-[60vh] items-center justify-center rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)]">
        <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
      </div>
    );
  }

  const selectedCustomer = selectedId ? customers.find((c) => c.id === selectedId) : null;
  const addressableCount = customers.filter((c) => !!c.address).length;
  const missingAddress = customers.length - addressableCount;

  // No customers with addresses — show clear empty state instead of blank map.
  if (addressableCount === 0) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-3 rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] px-6 text-center sm:h-[60vh]">
        <div className="text-[14px] font-semibold text-white">No addresses to map</div>
        <p className="max-w-sm text-[12.5px] leading-relaxed text-white/55">
          Add an address to your customers and they&apos;ll appear here. Useful for planning routes
          and seeing nearby jobs.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-[50vh] overflow-hidden rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] sm:h-[60vh] lg:h-[70vh]">
      <div ref={mapContainerRef} className="absolute inset-0" />

      {/* Loading indicator while geocoding */}
      {pendingGeocode > 0 && (
        <div className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 rounded-full border border-white/[0.08] bg-[hsl(0_0%_10%)]/95 px-3 py-1.5 text-[11px] font-medium text-white/75 backdrop-blur-md">
          Geocoding {pendingGeocode} address{pendingGeocode === 1 ? '' : 'es'}…
        </div>
      )}

      {/* Stats overlay */}
      <div className="pointer-events-none absolute right-3 top-3 flex flex-col items-end gap-1.5">
        <div className="rounded-full border border-white/[0.08] bg-[hsl(0_0%_10%)]/95 px-3 py-1.5 text-[11px] font-medium text-white/85 backdrop-blur-md">
          {markersReady.length} on map
        </div>
        {missingAddress > 0 && (
          <div className="rounded-full border border-amber-500/20 bg-amber-500/[0.12] px-3 py-1.5 text-[11px] font-medium text-amber-400 backdrop-blur-md">
            {missingAddress} without address
          </div>
        )}
      </div>

      {/* Selected customer card */}
      {selectedCustomer && (
        <div className="absolute inset-x-3 bottom-3 z-10 rounded-2xl border border-elec-yellow/30 bg-[hsl(0_0%_10%)]/95 p-4 shadow-2xl backdrop-blur-md sm:left-auto sm:right-3 sm:max-w-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
                Customer
              </div>
              <div className="mt-1 truncate text-[15px] font-semibold text-white">
                {selectedCustomer.name}
              </div>
              {selectedCustomer.address && (
                <div className="mt-1 truncate text-[12px] text-white/65">
                  {selectedCustomer.address}
                </div>
              )}
            </div>
            <button
              onClick={() => onSelect(null)}
              className="text-[18px] leading-none text-white/55 transition-colors hover:text-white touch-manipulation"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2">
            {selectedCustomer.phone && (
              <a
                href={`tel:${selectedCustomer.phone}`}
                className="flex h-9 items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-3 text-[12px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation"
              >
                Call
              </a>
            )}
            {selectedCustomer.email && (
              <a
                href={`mailto:${selectedCustomer.email}`}
                className="flex h-9 items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-3 text-[12px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation"
              >
                Email
              </a>
            )}
            <button
              onClick={() => navigate(`/customers/${selectedCustomer.id}`)}
              className="ml-auto flex h-9 items-center rounded-full bg-elec-yellow px-3.5 text-[12px] font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation"
            >
              Open →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const buildIcon = (isSelected: boolean) => ({
  url: `data:image/svg+xml;utf-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 24 30" fill="${isSelected ? '#FBBF24' : '#fbbf24cc'}" stroke="#1a1a1a" stroke-width="1.5"><path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 18 12 18s12-9 12-18c0-6.6-5.4-12-12-12zm0 16.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"/></svg>`
  )}`,
  scaledSize: new window.google.maps.Size(28, 36),
  anchor: new window.google.maps.Point(14, 36),
});

export const CustomerMap: React.FC<CustomerMapProps> = (props) => {
  return (
    <GoogleMapsProvider>
      <MapBody {...props} />
    </GoogleMapsProvider>
  );
};
