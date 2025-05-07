
import React, { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiErrorDisplay } from "../electrician-pricing/merchant-finder/ApiErrorDisplay";
import MapMarker from "./MapMarker";
import InfoOverlay from "./InfoOverlay";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  external_url: string;
}

interface JobMapProps {
  jobs: Job[];
  selectedJob: string | null;
  handleJobSelect: (jobId: string) => void;
  userLocation: string | null;
  isLoading: boolean;
}

interface MapMarkerData {
  jobId: string;
  position: google.maps.LatLngLiteral;
}

const JobMap: React.FC<JobMapProps> = ({ 
  jobs, 
  selectedJob, 
  handleJobSelect, 
  userLocation, 
  isLoading 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<MapMarkerData[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<string | null>(null);

  // Initialize Google Maps
  useEffect(() => {
    if (!window.google?.maps || !mapRef.current) return;
    
    try {
      googleMapRef.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 54.7023545, lng: -3.2765753 }, // Default to UK center
        zoom: 6,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
      });
    } catch (error) {
      console.error("Error initializing Google Maps:", error);
      setApiError("Failed to initialize Google Maps");
    }
  }, []);

  // Geocode job locations and create marker data
  useEffect(() => {
    if (!googleMapRef.current || !jobs.length || !window.google?.maps) return;
    
    const geocoder = new window.google.maps.Geocoder();
    const geocodePromises: Promise<MapMarkerData | null>[] = jobs.map(job => 
      new Promise(resolve => {
        geocoder.geocode({ address: `${job.location}, UK` }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            const position = results[0].geometry.location.toJSON();
            resolve({ jobId: job.id, position });
          } else {
            resolve(null);
          }
        });
      })
    );
    
    Promise.all(geocodePromises).then(results => {
      const validMarkers = results.filter(result => result !== null) as MapMarkerData[];
      setMarkers(validMarkers);
      
      // Fit map to markers
      if (validMarkers.length > 0 && googleMapRef.current) {
        const bounds = new window.google.maps.LatLngBounds();
        validMarkers.forEach(marker => {
          bounds.extend(marker.position);
        });
        googleMapRef.current.fitBounds(bounds);
      }
    });
  }, [jobs]);

  // Center map on selected job
  useEffect(() => {
    if (!googleMapRef.current || !selectedJob) return;
    
    const selectedMarker = markers.find(marker => marker.jobId === selectedJob);
    if (selectedMarker && googleMapRef.current) {
      googleMapRef.current.panTo(selectedMarker.position);
      googleMapRef.current.setZoom(12);
    }
  }, [selectedJob, markers]);

  // Get position of currently selected marker
  const getSelectedMarkerPosition = () => {
    return markers.find(marker => marker.jobId === selectedJob)?.position;
  };

  if (isLoading) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray p-4 relative h-[400px]">
        <Skeleton className="h-full w-full" />
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray p-0 relative h-[400px]">
      {apiError && <ApiErrorDisplay apiStatus={apiStatus} apiErrorMessage={apiError} />}
      <div ref={mapRef} className="h-full w-full rounded-md overflow-hidden" />
      
      {/* Render markers */}
      {jobs.map(job => {
        const markerData = markers.find(m => m.jobId === job.id);
        return markerData ? (
          <MapMarker 
            key={job.id}
            job={job}
            position={markerData.position}
            map={googleMapRef.current}
            isSelected={job.id === selectedJob}
            onClick={handleJobSelect}
          />
        ) : null;
      })}
      
      {/* Info overlay */}
      <InfoOverlay 
        userLocation={userLocation}
        selectedJob={selectedJob}
        selectedMarkerPosition={getSelectedMarkerPosition()}
      />
    </Card>
  );
};

export default JobMap;
