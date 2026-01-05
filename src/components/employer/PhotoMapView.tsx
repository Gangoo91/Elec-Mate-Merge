import { useState, useMemo, useCallback } from "react";
import { GoogleMap, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { Camera, MapPin, Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useGoogleMaps } from "@/contexts/GoogleMapsContext";
import { cn } from "@/lib/utils";

export type PhotoCategory = 'before' | 'during' | 'after' | 'issue' | 'completion' | 'safety';

export interface MapPhoto {
  id: string;
  jobId: string;
  jobTitle: string;
  uploadedBy: string;
  category: PhotoCategory;
  timestamp: string;
  location?: string;
  lat?: number;
  lng?: number;
  isApproved: boolean;
  isShared: boolean;
}

interface PhotoMapViewProps {
  photos: MapPhoto[];
  onPhotoClick: (photo: MapPhoto, index: number) => void;
  onToggleApproval: (photoId: string) => void;
  onToggleSharing: (photoId: string) => void;
}

const categoryColors: Record<PhotoCategory, string> = {
  before: "#3b82f6",
  during: "#f59e0b",
  after: "#22c55e",
  issue: "#ef4444",
  completion: "#a855f7",
  safety: "#8b5cf6",
};

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 51.5074,
  lng: -0.1278,
};

const getMapOptions = (): google.maps.MapOptions => ({
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  styles: [
    {
      featureType: "all",
      elementType: "geometry",
      stylers: [{ color: "#1a1a2e" }],
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#1a1a2e" }],
    },
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#0f0f23" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#2d2d44" }],
    },
  ],
});

export const PhotoMapView = ({
  photos,
  onPhotoClick,
  onToggleApproval,
  onToggleSharing,
}: PhotoMapViewProps) => {
  const { isLoaded, loadError, apiKey } = useGoogleMaps();
  const [selectedPhoto, setSelectedPhoto] = useState<MapPhoto | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // Filter photos with valid coordinates
  const photosWithLocation = useMemo(() => {
    return photos.filter((photo) => photo.lat && photo.lng);
  }, [photos]);

  // Calculate map bounds - only when isLoaded
  const bounds = useMemo(() => {
    if (!isLoaded || photosWithLocation.length === 0) return null;
    
    const bounds = new google.maps.LatLngBounds();
    photosWithLocation.forEach((photo) => {
      if (photo.lat && photo.lng) {
        bounds.extend({ lat: photo.lat, lng: photo.lng });
      }
    });
    return bounds;
  }, [photosWithLocation, isLoaded]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    if (bounds) {
      map.fitBounds(bounds, 50);
    }
  }, [bounds]);

  const handleMarkerClick = (photo: MapPhoto) => {
    setSelectedPhoto(photo);
  };

  const handleInfoWindowClose = () => {
    setSelectedPhoto(null);
  };

  const handleViewPhoto = () => {
    if (selectedPhoto) {
      const index = photos.findIndex((p) => p.id === selectedPhoto.id);
      onPhotoClick(selectedPhoto, index);
      setSelectedPhoto(null);
    }
  };

  if (!apiKey) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] bg-muted/20 rounded-lg border border-border/30">
        <MapPin className="h-12 w-12 text-muted-foreground/30 mb-4" />
        <h3 className="text-lg font-medium mb-2">Google Maps API Key Required</h3>
        <p className="text-sm text-muted-foreground text-center max-w-md px-4">
          Add your Google Maps API key in Settings to view photos on the map.
        </p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] bg-muted/20 rounded-lg border border-border/30">
        <MapPin className="h-12 w-12 text-destructive/50 mb-4" />
        <h3 className="text-lg font-medium mb-2">Failed to load map</h3>
        <p className="text-sm text-muted-foreground">
          There was an error loading Google Maps.
        </p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)] bg-muted/20 rounded-lg border border-border/30">
        <div className="animate-pulse text-muted-foreground">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-200px)] rounded-lg overflow-hidden border border-border/30">
      {/* Photo count - subtle top overlay */}
      <div className="absolute top-3 left-3 z-10">
        <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm border-border/30">
          <Camera className="h-3 w-3 mr-1" />
          {photosWithLocation.length} on map
        </Badge>
      </div>

      {/* Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={10}
        options={getMapOptions()}
        onLoad={onLoad}
      >
        {photosWithLocation.map((photo) => (
          <MarkerF
            key={photo.id}
            position={{ lat: photo.lat!, lng: photo.lng! }}
            onClick={() => handleMarkerClick(photo)}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: categoryColors[photo.category],
              fillOpacity: 0.9,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            }}
          />
        ))}

        {selectedPhoto && selectedPhoto.lat && selectedPhoto.lng && (
          <InfoWindowF
            position={{ lat: selectedPhoto.lat, lng: selectedPhoto.lng }}
            onCloseClick={handleInfoWindowClose}
          >
            <Card className="p-0 border-0 shadow-none bg-transparent min-w-[180px]">
              <div className="space-y-2">
                {/* Photo thumbnail */}
                <div className="w-full h-20 rounded-md overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 flex items-center justify-center">
                  <Camera className="h-6 w-6 text-muted-foreground/40" />
                </div>

                {/* Info */}
                <div>
                  <h4 className="font-medium text-sm text-foreground line-clamp-1">
                    {selectedPhoto.jobTitle}
                  </h4>
                  <Badge
                    variant="outline"
                    className="text-[10px] mt-1 capitalize"
                    style={{
                      borderColor: categoryColors[selectedPhoto.category],
                      color: categoryColors[selectedPhoto.category],
                    }}
                  >
                    {selectedPhoto.category}
                  </Badge>
                  {selectedPhoto.location && (
                    <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1 line-clamp-1">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      {selectedPhoto.location}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-1.5 pt-2 border-t border-border/30">
                  <Button
                    size="sm"
                    variant="default"
                    className="flex-1 h-7 text-xs"
                    onClick={handleViewPhoto}
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedPhoto.isApproved ? "secondary" : "ghost"}
                    className="h-7 w-7 p-0"
                    onClick={() => onToggleApproval(selectedPhoto.id)}
                  >
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedPhoto.isShared ? "secondary" : "ghost"}
                    className="h-7 w-7 p-0"
                    onClick={() => onToggleSharing(selectedPhoto.id)}
                  >
                    <Share2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          </InfoWindowF>
        )}
      </GoogleMap>

      {/* No photos message */}
      {photosWithLocation.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="text-center px-4">
            <MapPin className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium">No geotagged photos</h3>
            <p className="text-sm text-muted-foreground">
              Photos with location data will appear on the map
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
