
import React from "react";
import { MapPin, Clock } from "lucide-react";
import TravelTimeEstimate from "./TravelTimeEstimate";

interface InfoOverlayProps {
  userLocation: string | null;
  selectedJob: string | null;
  selectedMarkerPosition?: google.maps.LatLngLiteral;
}

const InfoOverlay: React.FC<InfoOverlayProps> = ({ 
  userLocation, 
  selectedJob, 
  selectedMarkerPosition 
}) => {
  if (!userLocation || !selectedJob) {
    return null;
  }

  return (
    <div className="absolute bottom-4 right-4 bg-elec-gray/90 p-3 rounded-md shadow border border-elec-yellow/30 max-w-[200px]">
      <div className="flex items-center text-sm text-elec-light mb-1">
        <MapPin className="h-3.5 w-3.5 mr-1.5 text-elec-yellow" />
        <span className="font-medium">Job Location</span>
      </div>
      <div className="flex items-center text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5 mr-1.5 text-elec-yellow" />
        <TravelTimeEstimate 
          origin={userLocation} 
          destination={selectedMarkerPosition} 
        />
      </div>
    </div>
  );
};

export default InfoOverlay;
