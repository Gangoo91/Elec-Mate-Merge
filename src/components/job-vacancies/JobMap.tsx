
import React, { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { MapPin, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiErrorDisplay } from "../electrician-pricing/merchant-finder/ApiErrorDisplay";

interface JobMapProps {
  jobs: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    external_url: string;
  }>;
  selectedJob: string | null;
  handleJobSelect: (jobId: string) => void;
  userLocation: string | null;
  isLoading: boolean;
}

interface MapMarker {
  jobId: string;
  title: string;
  company: string;
  position: google.maps.LatLngLiteral;
  marker?: google.maps.Marker;
}

const JobMap: React.FC<JobMapProps> = ({ jobs, selectedJob, handleJobSelect, userLocation, isLoading }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
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

    return () => {
      // Clean up markers
      markers.forEach(marker => marker.marker?.setMap(null));
    };
  }, []);

  // Add job markers to map
  useEffect(() => {
    if (!googleMapRef.current || !jobs.length || !window.google?.maps) return;

    // Clear existing markers
    markers.forEach(marker => marker.marker?.setMap(null));
    
    // Convert job locations to coordinates and create markers
    const geocoder = new window.google.maps.Geocoder();
    const newMarkers: MapMarker[] = [];
    
    const geocodePromises = jobs.map(job => new Promise<void>((resolve) => {
      geocoder.geocode({ address: `${job.location}, UK` }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK && results && results[0]) {
          const position = results[0].geometry.location.toJSON();
          
          const marker = new window.google.maps.Marker({
            position,
            map: googleMapRef.current,
            title: job.title,
            animation: window.google.maps.Animation.DROP,
            icon: {
              url: `data:image/svg+xml;utf-8,${encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="${job.id === selectedJob ? '#FFD700' : '#FF5733'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`
              )}`,
              scaledSize: new window.google.maps.Size(30, 30)
            }
          });
          
          marker.addListener("click", () => {
            handleJobSelect(job.id);
          });
          
          newMarkers.push({
            jobId: job.id,
            title: job.title,
            company: job.company,
            position,
            marker
          });
        }
        resolve();
      });
    }));
    
    Promise.all(geocodePromises).then(() => {
      setMarkers(newMarkers);
      
      // Fit map to markers
      if (newMarkers.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        newMarkers.forEach(marker => {
          bounds.extend(marker.position);
        });
        googleMapRef.current?.fitBounds(bounds);
      }
    }).catch(error => {
      console.error("Error geocoding job locations:", error);
    });
  }, [jobs, selectedJob, handleJobSelect]);

  // Center map on selected job
  useEffect(() => {
    if (!googleMapRef.current || !selectedJob) return;
    
    const selectedMarker = markers.find(marker => marker.jobId === selectedJob);
    if (selectedMarker) {
      googleMapRef.current.panTo(selectedMarker.position);
      googleMapRef.current.setZoom(12);
    }
  }, [selectedJob, markers]);

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
      {userLocation && selectedJob && (
        <div className="absolute bottom-4 right-4 bg-elec-gray/90 p-3 rounded-md shadow border border-elec-yellow/30 max-w-[200px]">
          <div className="flex items-center text-sm text-elec-light mb-1">
            <MapPin className="h-3.5 w-3.5 mr-1.5 text-elec-yellow" />
            <span className="font-medium">Job Location</span>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5 mr-1.5 text-elec-yellow" />
            <TravelTimeEstimate 
              origin={userLocation} 
              destination={markers.find(m => m.jobId === selectedJob)?.position} 
            />
          </div>
        </div>
      )}
    </Card>
  );
};

interface TravelTimeEstimateProps {
  origin: string;
  destination?: google.maps.LatLngLiteral;
}

const TravelTimeEstimate: React.FC<TravelTimeEstimateProps> = ({ origin, destination }) => {
  const [travelTime, setTravelTime] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!destination || !origin || !window.google?.maps) return;
    
    setIsLoading(true);
    const service = new window.google.maps.DistanceMatrixService();
    
    service.getDistanceMatrix({
      origins: [origin],
      destinations: [destination],
      travelMode: window.google.maps.TravelMode.DRIVING,
      unitSystem: window.google.maps.UnitSystem.IMPERIAL,
    }, (response, status) => {
      setIsLoading(false);
      
      if (status === 'OK' && response) {
        const time = response.rows[0].elements[0].duration.text;
        setTravelTime(time);
      } else {
        setTravelTime('Unknown');
      }
    });
  }, [origin, destination]);

  if (isLoading) return <span>Calculating...</span>;
  if (!travelTime) return <span>Travel time unavailable</span>;
  
  return <span>~{travelTime} by car</span>;
};

export default JobMap;
