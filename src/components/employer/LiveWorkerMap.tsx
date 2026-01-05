import { useState, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Navigation, 
  Users, 
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGoogleMaps } from '@/contexts/GoogleMapsContext';
import { GoogleMapsApiKeyInput } from './GoogleMapsApiKeyInput';
import type { WorkerLocationWithEmployee } from '@/services/locationService';
import type { Job } from '@/services/jobService';

interface LiveWorkerMapProps {
  workerLocations: WorkerLocationWithEmployee[];
  jobs: Job[];
  onRefresh?: () => void;
  isLoading?: boolean;
  className?: string;
}

const STATUS_COLOURS: Record<string, string> = {
  'On Site': '#22c55e',
  'En Route': '#f97316',
  'Office': '#3b82f6',
  'On Leave': '#6b7280',
  'Off Duty': '#9ca3af',
};

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
  onRefresh,
  isLoading,
  className 
}: LiveWorkerMapProps) {
  const { isLoaded, loadError, apiKey, clearApiKey } = useGoogleMaps();
  const [selectedWorker, setSelectedWorker] = useState<WorkerLocationWithEmployee | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
    
    // Fit bounds to show all markers
    if (workerLocations.length > 0 || jobs.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      workerLocations.forEach(loc => {
        if (loc.lat && loc.lng) bounds.extend({ lat: loc.lat, lng: loc.lng });
      });
      jobs.forEach(job => {
        if (job.lat && job.lng) bounds.extend({ lat: job.lat, lng: job.lng });
      });
      if (!bounds.isEmpty()) {
        mapInstance.fitBounds(bounds, 60);
      }
    }
  }, [workerLocations, jobs]);

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
        </GoogleMap>
        
        {/* Legend overlay */}
        <div className="absolute bottom-4 left-4 bg-elec-gray/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border">
          <div className="text-xs font-medium text-foreground mb-2">Status</div>
          <div className="space-y-1.5">
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
