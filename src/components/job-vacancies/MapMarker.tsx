
import React from "react";

interface MapMarkerProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
  };
  position: google.maps.LatLngLiteral;
  map: google.maps.Map | null;
  isSelected: boolean;
  onClick: (jobId: string) => void;
}

const MapMarker = ({ job, position, map, isSelected, onClick }: MapMarkerProps) => {
  React.useEffect(() => {
    if (!map || !window.google?.maps) return;

    const marker = new window.google.maps.Marker({
      position,
      map,
      title: job.title,
      animation: window.google.maps.Animation.DROP,
      icon: {
        url: `data:image/svg+xml;utf-8,${encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="${isSelected ? '#FFD700' : '#FF5733'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`
        )}`,
        scaledSize: new window.google.maps.Size(30, 30)
      }
    });
    
    marker.addListener("click", () => {
      onClick(job.id);
    });
    
    return () => {
      marker.setMap(null);
    };
  }, [job.id, job.title, map, position, isSelected, onClick]);

  return null; // This is a non-visual component that manipulates the map
};

export default MapMarker;
