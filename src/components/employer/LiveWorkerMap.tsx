import { useState, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Navigation,
  Users,
  RefreshCw,
  Building2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGoogleMaps } from '@/contexts/GoogleMapsContext';
import { GoogleMapsApiKeyInput } from './GoogleMapsApiKeyInput';
import type { WorkerLocationWithEmployee } from '@/services/locationService';
import type { Job } from '@/services/jobService';
import type { OfficeLocation } from '@/services/settingsService';

interface LiveWorkerMapProps {
  workerLocations: WorkerLocationWithEmployee[];
  jobs: Job[];
  officeLocation?: OfficeLocation | null;
  onRefresh?: () => void;
  isLoading?: boolean;
  className?: string;
}

const STATUS_COLOURS: Record<string, string> = {
  'On Site': '#22c55e',
  'En Route': '#f97316',
  'Office': '#a855f7',   // Purple for workers at office
  'On Leave': '#6b7280',
  'Off Duty': '#9ca3af',
};

// Office marker colour (purple, matches Office status)
const OFFICE_MARKER_COLOUR = '#a855f7';

// Default centre - Manchester
const DEFAULT_CENTER = { lat: 53.4808, lng: -2.2426 };

// Dark mode map styles
const darkMapStyles = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] },
];

export function LiveWorkerMap({
  workerLocations,
  jobs,
  officeLocation,
  onRefresh,
  isLoading,
  className
}: LiveWorkerMapProps) {
  const { isLoaded, loadError, apiKey, clearApiKey } = useGoogleMaps();
  const [selectedWorker, setSelectedWorker] = useState<WorkerLocationWithEmployee | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedOffice, setSelectedOffice] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);

    // Fit bounds to show all markers
    const bounds = new google.maps.LatLngBounds();
    let hasMarkers = false;

    // Include office location in bounds
    if (officeLocation?.lat && officeLocation?.lng) {
      bounds.extend({ lat: officeLocation.lat, lng: officeLocation.lng });
      hasMarkers = true;
    }

    workerLocations.forEach(loc => {
      if (loc.lat && loc.lng) {
        bounds.extend({ lat: loc.lat, lng: loc.lng });
        hasMarkers = true;
      }
    });
    jobs.forEach(job => {
      if (job.lat && job.lng) {
        bounds.extend({ lat: job.lat, lng: job.lng });
        hasMarkers = true;
      }
    });

    if (hasMarkers && !bounds.isEmpty()) {
      mapInstance.fitBounds(bounds, 60);
    }
  }, [workerLocations, jobs, officeLocation]);

  // API key input view
  if (!apiKey) {
    return (
      <div className={className}>
        <GoogleMapsApiKeyInput 
          title="Live Worker Map"
          description="Enter your Google Maps API key to enable the live worker tracking map."
        />
      </div>
    );
  }

  if (loadError) {
    return (
      <Card className={cn("bg-elec-gray overflow-hidden", className)}>
        <CardContent className="p-6 text-center">
          <p className="text-destructive">Error loading Google Maps. Please check your API key.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={clearApiKey}
          >
            Reset API Key
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!isLoaded) {
    return (
      <Card className={cn("bg-elec-gray overflow-hidden", className)}>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Loading map...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("bg-elec-gray overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Navigation className="h-5 w-5 text-elec-yellow" />
            Live Worker Map
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              {workerLocations.length} tracked
            </Badge>
            {onRefresh && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onRefresh}
                disabled={isLoading}
              >
                <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 relative">
        <GoogleMap
          mapContainerStyle={{ height: '400px', width: '100%' }}
          center={DEFAULT_CENTER}
          zoom={6}
          onLoad={onLoad}
          options={{
            styles: darkMapStyles,
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          }}
        >
          {/* Office marker */}
          {officeLocation?.lat && officeLocation?.lng && (
            <Marker
              key="office"
              position={{ lat: officeLocation.lat, lng: officeLocation.lng }}
              icon={{
                path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
                scale: 1.8,
                fillColor: OFFICE_MARKER_COLOUR,
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2,
                anchor: new google.maps.Point(12, 22),
              }}
              onClick={() => setSelectedOffice(true)}
              zIndex={1000}
            />
          )}

          {/* Job markers */}
          {jobs.map((job) => {
            if (!job.lat || !job.lng) return null;
            return (
              <Marker
                key={`job-${job.id}`}
                position={{ lat: job.lat, lng: job.lng }}
                icon={{
                  path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                  scale: 6,
                  fillColor: '#3b82f6',
                  fillOpacity: 1,
                  strokeColor: '#ffffff',
                  strokeWeight: 2,
                }}
                onClick={() => setSelectedJob(job)}
              />
            );
          })}

          {/* Worker markers */}
          {workerLocations.map((loc) => {
            if (!loc.lat || !loc.lng) return null;
            const colour = STATUS_COLOURS[loc.status] || STATUS_COLOURS['Off Duty'];
            return (
              <Marker
                key={`worker-${loc.id}`}
                position={{ lat: loc.lat, lng: loc.lng }}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 12,
                  fillColor: colour,
                  fillOpacity: 1,
                  strokeColor: '#ffffff',
                  strokeWeight: 3,
                }}
                label={{
                  text: loc.employees?.avatar_initials || '??',
                  color: '#ffffff',
                  fontSize: '10px',
                  fontWeight: 'bold',
                }}
                onClick={() => setSelectedWorker(loc)}
              />
            );
          })}

          {/* Job InfoWindow */}
          {selectedJob && selectedJob.lat && selectedJob.lng && (
            <InfoWindow
              position={{ lat: selectedJob.lat, lng: selectedJob.lng }}
              onCloseClick={() => setSelectedJob(null)}
            >
              <div className="p-2 min-w-[150px]">
                <p className="font-semibold text-gray-900">{selectedJob.title}</p>
                <p className="text-sm text-gray-600">{selectedJob.client}</p>
                <p className="text-xs text-gray-500">{selectedJob.location}</p>
              </div>
            </InfoWindow>
          )}

          {/* Worker InfoWindow */}
          {selectedWorker && selectedWorker.lat && selectedWorker.lng && (
            <InfoWindow
              position={{ lat: selectedWorker.lat, lng: selectedWorker.lng }}
              onCloseClick={() => setSelectedWorker(null)}
            >
              <div className="p-2 min-w-[150px]">
                <p className="font-semibold text-gray-900">{selectedWorker.employees?.name}</p>
                <span
                  className="inline-block px-2 py-0.5 rounded text-xs font-medium mt-1"
                  style={{
                    backgroundColor: `${STATUS_COLOURS[selectedWorker.status]}20`,
                    color: STATUS_COLOURS[selectedWorker.status]
                  }}
                >
                  {selectedWorker.status}
                </span>
                {selectedWorker.jobs?.title && (
                  <p className="text-xs text-gray-600 mt-1">📍 {selectedWorker.jobs.title}</p>
                )}
              </div>
            </InfoWindow>
          )}

          {/* Office InfoWindow */}
          {selectedOffice && officeLocation?.lat && officeLocation?.lng && (
            <InfoWindow
              position={{ lat: officeLocation.lat, lng: officeLocation.lng }}
              onCloseClick={() => setSelectedOffice(false)}
            >
              <div className="p-2 min-w-[150px]">
                <p className="font-semibold text-gray-900 flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-purple-500" />
                  Head Office
                </p>
                {officeLocation.address && (
                  <p className="text-xs text-gray-600 mt-1">{officeLocation.address}</p>
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
        
        {/* Legend overlay */}
        <div className="absolute bottom-4 left-4 bg-elec-gray/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border">
          <div className="text-xs font-medium text-foreground mb-2">Legend</div>
          <div className="space-y-1.5">
            {/* Office marker */}
            {officeLocation?.lat && officeLocation?.lng && (
              <div className="flex items-center gap-2 text-xs">
                <div
                  className="w-3 h-3 border border-white/50"
                  style={{ background: OFFICE_MARKER_COLOUR, borderRadius: '2px' }}
                />
                <span className="text-muted-foreground">Head Office</span>
              </div>
            )}
            {/* Job marker */}
            <div className="flex items-center gap-2 text-xs">
              <div
                className="w-3 h-3 border border-white/50"
                style={{ background: '#3b82f6', clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
              />
              <span className="text-muted-foreground">Job Site</span>
            </div>
            {/* Worker status colours */}
            {Object.entries(STATUS_COLOURS).slice(0, 4).map(([status, colour]) => (
              <div key={status} className="flex items-center gap-2 text-xs">
                <div
                  className="w-3 h-3 rounded-full border border-white/50"
                  style={{ background: colour }}
                />
                <span className="text-muted-foreground">{status}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
