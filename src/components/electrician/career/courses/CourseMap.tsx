import React, { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ProviderInfoOverlay from "./ProviderInfoOverlay";

interface TrainingProvider {
  place_id: string;
  name: string;
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  rating?: number;
  user_ratings_total?: number;
  types: string[];
  distance?: number;
  category?: string;
}

interface CourseMapProps {
  nearbyProviders: TrainingProvider[];
  selectedCourse: string | null;
  onCourseSelect: (courseId: string) => void;
  onCourseDeselect?: () => void;
  userLocation: string | null;
  userCoordinates: google.maps.LatLngLiteral | null;
  searchRadius: number;
  isLoading: boolean;
}

interface ProviderMarkerData {
  providerId: string;
  position: google.maps.LatLngLiteral;
  provider: TrainingProvider;
}

const CourseMap: React.FC<CourseMapProps> = ({ 
  nearbyProviders, 
  selectedCourse, 
  onCourseSelect, 
  onCourseDeselect,
  userLocation,
  userCoordinates, 
  searchRadius,
  isLoading 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<ProviderMarkerData[]>([]);
  const userMarkerRef = useRef<google.maps.Marker | null>(null);
  const radiusCircleRef = useRef<any>(null);
  const providerMarkersRef = useRef<google.maps.Marker[]>([]);

  // Debug logging
  console.log('CourseMap received providers:', nearbyProviders.length);
  console.log('User coordinates:', userCoordinates);
  console.log('Search radius:', searchRadius);

  // Initialize Google Maps with optimized settings
  useEffect(() => {
    if (!window.google?.maps || !mapRef.current) return;
    
    try {
      googleMapRef.current = new window.google.maps.Map(mapRef.current, {
        center: userCoordinates || { lat: 54.7023545, lng: -3.2765753 },
        zoom: userCoordinates ? 10 : 6,
        // Optimized settings to reduce API costs
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        scaleControl: false,
        // Disable auto-loading of extra map types
        mapTypeId: 'roadmap'
      });
    } catch (error) {
      console.error("Error initializing Google Maps:", error);
    }
  }, [userCoordinates]);

  // Create markers for Google Places providers (no geocoding needed)
  useEffect(() => {
    if (!googleMapRef.current || !window.google?.maps) return;
    
    // Clear existing provider markers
    providerMarkersRef.current.forEach(marker => {
      marker.setMap(null);
    });
    providerMarkersRef.current = [];
    
    // Create markers for nearby providers
    const providerMarkers = nearbyProviders.map(provider => {
      const position = {
        lat: provider.geometry.location.lat,
        lng: provider.geometry.location.lng
      };
      
      const marker = new window.google.maps.Marker({
        position,
        map: googleMapRef.current,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#3B82F6',
          fillOpacity: 0.8,
          strokeColor: '#FFFFFF',
          strokeWeight: 2,
          scale: selectedCourse === provider.place_id ? 12 : 8,
        } as any,
        title: `${provider.name} - ${provider.vicinity}`,
      });
      
      marker.addListener('click', () => {
        onCourseSelect(provider.place_id);
      });
      
      return marker;
    });
    
    providerMarkersRef.current = providerMarkers;
    
    // Create marker data for overlay
    const markerData: ProviderMarkerData[] = nearbyProviders.map(provider => ({
      providerId: provider.place_id,
      position: {
        lat: provider.geometry.location.lat,
        lng: provider.geometry.location.lng
      },
      provider
    }));
    
    setMarkers(markerData);
    
    // Handle map centering and bounds
    if (userCoordinates && googleMapRef.current) {
      googleMapRef.current.setCenter(userCoordinates);
      googleMapRef.current.setZoom(11);
    } else if (nearbyProviders.length > 0 && googleMapRef.current) {
      const bounds = new window.google.maps.LatLngBounds();
      nearbyProviders.forEach(provider => {
        bounds.extend({
          lat: provider.geometry.location.lat,
          lng: provider.geometry.location.lng
        });
      });
      googleMapRef.current.fitBounds(bounds);
    }
    
    console.log('Created markers for providers:', nearbyProviders.length);
  }, [nearbyProviders, selectedCourse, onCourseSelect, userCoordinates]);

  // Handle user location marker and radius circle
  useEffect(() => {
    if (!googleMapRef.current || !window.google?.maps) return;

    // Clean up existing user marker and radius circle
    if (userMarkerRef.current) {
      userMarkerRef.current.setMap(null);
      userMarkerRef.current = null;
    }
    if (radiusCircleRef.current) {
      radiusCircleRef.current.setMap(null);
      radiusCircleRef.current = null;
    }

    // Add user location marker and radius circle if coordinates available
    if (userCoordinates) {
      // User location marker
      userMarkerRef.current = new window.google.maps.Marker({
        position: userCoordinates,
        map: googleMapRef.current,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: '#3B82F6',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 3,
          scale: 10,
        } as any,
        title: 'Your Location',
      } as any);

      // Search radius circle
      radiusCircleRef.current = new (window.google.maps as any).Circle({
        strokeColor: '#3B82F6',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#3B82F6',
        fillOpacity: 0.1,
        map: googleMapRef.current,
        center: userCoordinates,
        radius: searchRadius * 1609.34, // Convert miles to meters
      });
    }

    return () => {
      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null);
      }
      if (radiusCircleRef.current) {
        radiusCircleRef.current.setMap(null);
      }
    };
  }, [userCoordinates, searchRadius]);

  // Center map on selected provider
  useEffect(() => {
    if (!googleMapRef.current || !selectedCourse) return;
    
    const selectedMarker = markers.find(marker => marker.providerId === selectedCourse);
    if (selectedMarker && googleMapRef.current) {
      googleMapRef.current.panTo(selectedMarker.position);
      googleMapRef.current.setZoom(14);
    }
  }, [selectedCourse, markers]);

  const getSelectedProvider = () => {
    return markers.find(marker => marker.providerId === selectedCourse)?.provider;
  };

  if (isLoading) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray p-4 relative h-[500px]">
        <Skeleton className="h-full w-full" />
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray p-0 relative h-[500px]">
      <div ref={mapRef} className="h-full w-full rounded-md overflow-hidden" />
      
      {/* Results info overlay */}
      {(userCoordinates || nearbyProviders.length > 0) && (
        <div className="absolute top-2 left-2 bg-background/95 backdrop-blur-sm border border-border/50 shadow-lg p-3 rounded-md text-xs z-[1000]">
          <div className="text-sm font-medium text-foreground">
            {markers.length} training provider{markers.length !== 1 ? 's' : ''} found
          </div>
          {userCoordinates && (
            <div className="text-xs text-muted-foreground">
              Within {searchRadius} miles of your location
            </div>
          )}
          <div className="text-xs text-muted-foreground mt-1">
            From Google Places API
          </div>
        </div>
      )}
      
      {/* Empty state message */}
      {nearbyProviders.length === 0 && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-[1000]">
          <div className="text-center p-6 max-w-md">
            <div className="text-lg font-medium text-foreground mb-2">
              No training providers found
            </div>
            <div className="text-sm text-muted-foreground mb-4">
              {userLocation 
                ? `No electrical training providers found within ${searchRadius} miles of ${userLocation}. Try increasing the search radius or searching a different area.`
                : "Set your location and search for nearby electrical training providers using the search button above."
              }
            </div>
          </div>
        </div>
      )}
      
      {/* Debug info overlay */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 right-2 bg-black/80 text-white p-2 rounded text-xs z-[1000]">
          Providers: {nearbyProviders.length} | Markers: {markers.length}
          {userCoordinates && <div>User: {userCoordinates.lat.toFixed(4)}, {userCoordinates.lng.toFixed(4)}</div>}
        </div>
      )}
      
      <ProviderInfoOverlay 
        userLocation={userLocation}
        selectedProvider={getSelectedProvider()}
        onClose={onCourseDeselect}
      />
    </Card>
  );
};

export default CourseMap;