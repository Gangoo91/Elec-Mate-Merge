import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, MapPin, Star, Users, Phone, Globe } from "lucide-react";

interface TrainingProvider {
  place_id: string;
  name: string;
  vicinity: string;
  location: {
    lat: number;
    lng: number;
  };
  rating?: number;
  user_ratings_total?: number;
  types?: string[];
  business_status?: string;
  price_level?: number;
  phone?: string;
  website?: string;
  opening_hours?: {
    open_now?: boolean;
    weekday_text?: string[];
  };
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  search_context?: string;
  category?: string;
  distance?: number;
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
      <CardContent className="space-y-3">
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
            {selectedProvider.category && (
              <Badge variant="secondary" className="text-xs mt-1">
                {selectedProvider.category}
              </Badge>
            )}
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

        {/* Business Status */}
        {selectedProvider.business_status && (
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              selectedProvider.business_status === 'OPERATIONAL' ? 'bg-green-500' : 'bg-red-500'
            }`} />
            <span className="text-xs text-muted-foreground">
              {selectedProvider.business_status === 'OPERATIONAL' ? 'Open' : 'Closed'}
            </span>
            {selectedProvider.opening_hours?.open_now !== undefined && (
              <span className="text-xs text-muted-foreground">
                • {selectedProvider.opening_hours.open_now ? 'Open now' : 'Closed now'}
              </span>
            )}
          </div>
        )}

        {/* Contact Information */}
        {selectedProvider.phone && (
          <div className="flex items-center gap-2">
            <Phone className="h-3 w-3 text-muted-foreground" />
            <a 
              href={`tel:${selectedProvider.phone}`}
              className="text-xs text-primary hover:underline"
            >
              {selectedProvider.phone}
            </a>
          </div>
        )}

        {selectedProvider.website && (
          <div className="flex items-center gap-2">
            <Globe className="h-3 w-3 text-muted-foreground" />
            <a 
              href={selectedProvider.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline truncate"
            >
              Visit Website
            </a>
          </div>
        )}

        {/* Search Context */}
        {selectedProvider.search_context && (
          <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
            Found via: {selectedProvider.search_context}
          </div>
        )}

        {/* Distance */}
        {selectedProvider.distance && (
          <p className="text-xs text-muted-foreground">
            {formatDistance(selectedProvider.distance)}
          </p>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const query = encodeURIComponent(`${selectedProvider.name} electrical training courses`);
                window.open(`https://www.google.com/search?q=${query}`, '_blank');
              }}
              className="flex-1 h-8 text-xs"
            >
              <Globe className="h-3 w-3 mr-1" />
              Search Courses
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const coords = selectedProvider.location;
                const url = `https://www.google.com/maps?q=${coords.lat},${coords.lng}`;
                window.open(url, '_blank');
              }}
              className="flex-1 h-8 text-xs"
            >
              <MapPin className="h-3 w-3 mr-1" />
              Directions
            </Button>
          </div>
          
          {selectedProvider.website && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => window.open(selectedProvider.website, '_blank')}
              className="w-full h-8 text-xs"
            >
              Visit Official Website
            </Button>
          )}
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
