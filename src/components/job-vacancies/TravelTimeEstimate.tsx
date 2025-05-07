
import React, { useState, useEffect } from "react";

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

export default TravelTimeEstimate;
