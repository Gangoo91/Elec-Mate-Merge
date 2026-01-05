import { useState, useCallback, useMemo } from "react";
import { GoogleMap, Marker, InfoWindow, Circle } from '@react-google-maps/api';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { 
  MapPin, 
  Star, 
  CheckCircle, 
  Navigation,
  X,
  Plus,
  Minus,
  Crosshair
} from "lucide-react";
import { useGoogleMaps } from "@/contexts/GoogleMapsContext";
import { GoogleMapsApiKeyInput } from "./GoogleMapsApiKeyInput";
import type { EnhancedElectrician } from "./SparkProfileSheet";

// Manchester city centre
const BASE_LAT = 53.4808;
const BASE_LNG = -2.2426;
const DEFAULT_CENTER = { lat: BASE_LAT, lng: BASE_LNG };

interface TalentMapViewProps {
  electricians: EnhancedElectrician[];
  savedCandidates: string[];
  labourBankIds: string[];
  onSelectElectrician: (electrician: EnhancedElectrician) => void;
}

// Haversine formula for distance calculation
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
};

export function TalentMapView({
  electricians,
  savedCandidates,
  labourBankIds,
  onSelectElectrician,
}: TalentMapViewProps) {
  const { isLoaded, loadError, apiKey, clearApiKey } = useGoogleMaps();
  const [radius, setRadius] = useState([25]);
  const [selectedMarker, setSelectedMarker] = useState<EnhancedElectrician | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // Filter electricians by distance from centre
  const filteredElectricians = useMemo(() => {
    return electricians.filter(e => {
      if (!e.coordinates) return false;
      const distance = calculateDistance(BASE_LAT, BASE_LNG, e.coordinates.lat, e.coordinates.lng);
      return distance <= radius[0];
    });
  }, [electricians, radius]);

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  const handleZoomIn = () => map?.setZoom((map.getZoom() || 10) + 1);
  const handleZoomOut = () => map?.setZoom((map.getZoom() || 10) - 1);
  const handleCentre = () => {
    map?.panTo(DEFAULT_CENTER);
    map?.setZoom(10);
  };

  const handleFitBounds = () => {
    if (!map || filteredElectricians.length === 0) return;
    
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(DEFAULT_CENTER);
    filteredElectricians.forEach(e => {
      if (e.coordinates) {
        bounds.extend({ lat: e.coordinates.lat, lng: e.coordinates.lng });
      }
    });
    
    map.fitBounds(bounds, 50);
  };

  // API key input screen
  if (!apiKey) {
    return (
      <GoogleMapsApiKeyInput 
        title="Enable Map View"
        description="Enter your Google Maps API key to view electricians on the map."
      />
    );
  }

  if (loadError) {
    return (
      <Card className="bg-elec-gray border-border">
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
      <Card className="bg-elec-gray border-border">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Loading map...</p>
        </CardContent>
      </Card>
    );
  }

  // Convert miles to metres for Google Maps Circle
  const radiusInMetres = radius[0] * 1609.34;

  return (
    <div className="space-y-4">
      {/* Radius Filter */}
      <Card className="bg-elec-gray border-border">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Navigation className="h-4 w-4 text-elec-yellow" />
              <span className="font-medium">Search Radius</span>
            </div>
            <Badge variant="secondary">{radius[0]} miles</Badge>
          </div>
          <Slider
            value={radius}
            onValueChange={setRadius}
            min={5}
            max={50}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>5mi</span>
            <span>25mi</span>
            <span>50mi</span>
          </div>
        </CardContent>
      </Card>

      {/* Map Container */}
      <Card className="bg-elec-gray border-border overflow-hidden">
        <div className="relative h-[450px]">
          <GoogleMap
            mapContainerStyle={{ height: '100%', width: '100%' }}
            center={DEFAULT_CENTER}
            zoom={10}
            onLoad={onLoad}
            options={{
              disableDefaultUI: true,
              zoomControl: false,
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
            }}
          >
            {/* Search radius circle */}
            <Circle
              center={DEFAULT_CENTER}
              radius={radiusInMetres}
              options={{
                fillColor: '#3b82f6',
                fillOpacity: 0.1,
                strokeColor: '#3b82f6',
                strokeWeight: 2,
                strokeOpacity: 0.8,
              }}
            />

            {/* Centre marker */}
            <Marker
              position={DEFAULT_CENTER}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: '#2563eb',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2,
              }}
            />

            {/* Electrician markers */}
            {filteredElectricians.map((elec) => {
              if (!elec.coordinates) return null;
              const isInLabourBank = labourBankIds.includes(elec.id);
              const isSelected = selectedMarker?.id === elec.id;
              
              return (
                <Marker
                  key={elec.id}
                  position={{ lat: elec.coordinates.lat, lng: elec.coordinates.lng }}
                  icon={{
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 14,
                    fillColor: isInLabourBank ? '#22c55e' : '#8b5cf6',
                    fillOpacity: 1,
                    strokeColor: isSelected ? '#3b82f6' : '#ffffff',
                    strokeWeight: isSelected ? 3 : 2,
                  }}
                  label={{
                    text: elec.name.split(' ').map(n => n[0]).join(''),
                    color: '#ffffff',
                    fontSize: '10px',
                    fontWeight: 'bold',
                  }}
                  onClick={() => setSelectedMarker(prev => prev?.id === elec.id ? null : elec)}
                />
              );
            })}

            {/* Selected electrician InfoWindow */}
            {selectedMarker && selectedMarker.coordinates && (
              <InfoWindow
                position={{ lat: selectedMarker.coordinates.lat, lng: selectedMarker.coordinates.lng }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div className="p-1 min-w-[120px]">
                  <p className="font-semibold text-gray-900">{selectedMarker.name}</p>
                  <p className="text-xs text-gray-600">{selectedMarker.ecsCardType}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {calculateDistance(BASE_LAT, BASE_LNG, selectedMarker.coordinates.lat, selectedMarker.coordinates.lng).toFixed(1)} miles away
                  </p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
          
          {/* Custom zoom controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
            <Button 
              variant="secondary" 
              size="icon" 
              className="h-10 w-10 shadow-lg"
              onClick={handleZoomIn}
            >
              <Plus className="h-5 w-5" />
            </Button>
            <Button 
              variant="secondary" 
              size="icon" 
              className="h-10 w-10 shadow-lg"
              onClick={handleZoomOut}
            >
              <Minus className="h-5 w-5" />
            </Button>
            <Button 
              variant="secondary" 
              size="icon" 
              className="h-10 w-10 shadow-lg"
              onClick={handleCentre}
            >
              <Crosshair className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Fit to bounds button */}
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-4 left-4 z-10 shadow-lg"
            onClick={handleFitBounds}
          >
            Fit All
          </Button>
        </div>
      </Card>

      {/* Selected Marker Card */}
      {selectedMarker && (
        <Card className="bg-elec-gray border-border animate-scale-in">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Avatar className="w-14 h-14">
                <AvatarImage src={selectedMarker.avatar} alt={selectedMarker.name} />
                <AvatarFallback className="bg-elec-yellow text-elec-dark font-bold">
                  {selectedMarker.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold truncate">{selectedMarker.name}</h3>
                  {selectedMarker.verified && <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />}
                </div>
                <p className="text-sm text-muted-foreground">{selectedMarker.ecsCardType}</p>
                <div className="flex items-center gap-3 mt-1 text-sm">
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                    {selectedMarker.rating}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {selectedMarker.coordinates ? 
                      calculateDistance(BASE_LAT, BASE_LNG, selectedMarker.coordinates.lat, selectedMarker.coordinates.lng).toFixed(1) : 
                      selectedMarker.distance}mi
                  </span>
                  <span className={`${selectedMarker.availability === 'Immediate' ? 'text-green-500' : 'text-muted-foreground'}`}>
                    {selectedMarker.availability}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold text-lg">£{selectedMarker.dayRate}</p>
                <p className="text-xs text-muted-foreground">/day</p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 -mt-1 -mr-2"
                onClick={() => setSelectedMarker(null)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <Button 
              className="w-full mt-3 h-12"
              onClick={() => onSelectElectrician(selectedMarker)}
            >
              View Profile
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
        <span>{filteredElectricians.length} sparks within {radius[0]} miles</span>
        <span>•</span>
        <span>{filteredElectricians.filter(e => e.availability === 'Immediate').length} available now</span>
      </div>
    </div>
  );
}
