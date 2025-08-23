import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, MapPin, Star, Users, Phone, Globe } from "lucide-react";

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

interface ProviderInfoOverlayProps {
  userLocation: string | null;
  selectedProvider: TrainingProvider | null;
  onClose?: () => void;
}

const ProviderInfoOverlay: React.FC<ProviderInfoOverlayProps> = ({
  userLocation,
  selectedProvider,
  onClose
}) => {
  if (!selectedProvider) {
    return (
      <Card className="absolute bottom-4 left-4 w-80 bg-background/95 backdrop-blur-sm border border-border/50 shadow-lg z-[1000]">
        <CardContent className="p-4">
          <div className="text-center">
            <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Click on a marker to view training provider details
            </p>
            {userLocation && (
              <p className="text-xs text-muted-foreground mt-2">
                Your location: {userLocation}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'university': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      'school': 'bg-green-500/10 text-green-600 border-green-500/20',
      'establishment': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
      'point_of_interest': 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    };
    
    const categoryKey = category?.toLowerCase() as keyof typeof colors;
    return colors[categoryKey] || 'bg-gray-500/10 text-gray-600 border-gray-500/20';
  };

  const formatDistance = (distance?: number) => {
    if (!distance) return null;
    return distance < 1 
      ? `${(distance * 1000).toFixed(0)}m away`
      : `${distance.toFixed(1)} miles away`;
  };

  return (
    <Card className="absolute bottom-4 left-4 w-80 max-w-[calc(100vw-2rem)] bg-background/95 backdrop-blur-sm border border-border/50 shadow-lg z-[1000]">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm leading-tight pr-2">
              {selectedProvider.name}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <p className="text-xs text-muted-foreground truncate">
                {selectedProvider.vicinity}
              </p>
            </div>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0 shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Rating */}
        {selectedProvider.rating && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">
                {selectedProvider.rating.toFixed(1)}
              </span>
            </div>
            {selectedProvider.user_ratings_total && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                <span>{selectedProvider.user_ratings_total} reviews</span>
              </div>
            )}
          </div>
        )}

        {/* Category/Type */}
        {selectedProvider.category && (
          <Badge 
            variant="outline" 
            className={`text-xs ${getCategoryColor(selectedProvider.category)}`}
          >
            {selectedProvider.category.replace(/_/g, ' ').toUpperCase()}
          </Badge>
        )}

        {/* Distance */}
        {selectedProvider.distance && (
          <p className="text-xs text-muted-foreground">
            {formatDistance(selectedProvider.distance)}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const query = encodeURIComponent(`${selectedProvider.name} ${selectedProvider.vicinity}`);
              window.open(`https://www.google.com/search?q=${query}`, '_blank');
            }}
            className="flex-1 h-8 text-xs"
          >
            <Globe className="h-3 w-3 mr-1" />
            Search Online
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const coords = selectedProvider.geometry.location;
              const url = `https://www.google.com/maps?q=${coords.lat},${coords.lng}`;
              window.open(url, '_blank');
            }}
            className="flex-1 h-8 text-xs"
          >
            <MapPin className="h-3 w-3 mr-1" />
            Directions
          </Button>
        </div>

        {userLocation && (
          <p className="text-xs text-muted-foreground pt-2 border-t border-border/50">
            Your location: {userLocation}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProviderInfoOverlay;