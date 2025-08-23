import React from "react";
import { MapPin, Star, Phone, Globe, Clock, X, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  // Debug logging for overlay rendering
  console.log('🎯 ProviderInfoOverlay rendering with:', {
    hasSelectedProvider: !!selectedProvider,
    providerName: selectedProvider?.name,
    userLocation
  });

  if (!selectedProvider) {
    return (
      <div className="absolute bottom-4 right-4 bg-elec-gray/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-elec-yellow/30 max-w-[300px] z-[1000]">
        <div className="flex items-center text-sm text-elec-light mb-2">
          <MapPin className="h-4 w-4 mr-2 text-elec-yellow" />
          <span className="font-medium">Training Provider Details</span>
        </div>
        <div className="text-xs text-muted-foreground">
          Click on a marker to view provider details
        </div>
        {userLocation && (
          <div className="mt-3 pt-3 border-t border-elec-yellow/20">
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1 text-elec-yellow/60" />
              <span>Your location: {userLocation}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  const handleViewWebsite = () => {
    if (selectedProvider.website) {
      window.open(selectedProvider.website, '_blank', 'noopener,noreferrer');
    }
  };

  const handleGetDirections = () => {
    const { lat, lng } = selectedProvider.location;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${selectedProvider.place_id}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCall = () => {
    if (selectedProvider.phone) {
      window.location.href = `tel:${selectedProvider.phone}`;
    }
  };

  const formatRating = (rating?: number, total?: number) => {
    if (!rating) return "No rating";
    return `${rating.toFixed(1)} (${total || 0} reviews)`;
  };

  const getOpenStatus = () => {
    if (!selectedProvider.opening_hours) return null;
    return selectedProvider.opening_hours.open_now ? "Open now" : "Closed now";
  };

  const getPriceLevel = (level?: number) => {
    if (!level) return "";
    return "£".repeat(level);
  };

  return (
    <div className="absolute bottom-4 right-4 bg-elec-gray/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-elec-yellow/30 max-w-[320px] z-[1000]">
      {/* Header with close button */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center text-sm text-elec-light">
          <MapPin className="h-4 w-4 mr-2 text-elec-yellow" />
          <span className="font-medium">Training Provider</span>
        </div>
        {onClose && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="h-6 w-6 p-0 text-muted-foreground hover:text-elec-yellow"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Provider name */}
      <h3 className="font-semibold text-elec-light text-sm mb-2 leading-tight">
        {selectedProvider.name}
      </h3>

      {/* Rating and status */}
      <div className="flex items-center gap-3 mb-2">
        {selectedProvider.rating && (
          <div className="flex items-center text-xs text-muted-foreground">
            <Star className="h-3 w-3 mr-1 text-yellow-400 fill-current" />
            <span>{formatRating(selectedProvider.rating, selectedProvider.user_ratings_total)}</span>
          </div>
        )}
        {getOpenStatus() && (
          <div className="flex items-center text-xs">
            <Clock className="h-3 w-3 mr-1 text-elec-yellow" />
            <span className={getOpenStatus() === "Open now" ? "text-green-400" : "text-red-400"}>
              {getOpenStatus()}
            </span>
          </div>
        )}
      </div>

      {/* Address */}
      <div className="text-xs text-muted-foreground mb-3">
        {selectedProvider.vicinity}
      </div>

      {/* Price level */}
      {selectedProvider.price_level && (
        <div className="text-xs text-muted-foreground mb-3">
          Price range: {getPriceLevel(selectedProvider.price_level)}
        </div>
      )}

      {/* Distance */}
      {selectedProvider.distance && (
        <div className="text-xs text-muted-foreground mb-3">
          Distance: {selectedProvider.distance.toFixed(1)} miles
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2 mb-3">
        {/* Directions button hidden per user request */}
        
        {selectedProvider.website && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleViewWebsite}
            className="flex-1 h-7 text-xs border-elec-yellow/30 text-elec-light hover:bg-elec-yellow/10"
          >
            <Globe className="h-3 w-3 mr-1" />
            Website
          </Button>
        )}
        
        {selectedProvider.phone && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCall}
            className="flex-1 h-7 text-xs border-elec-yellow/30 text-elec-light hover:bg-elec-yellow/10"
          >
            <Phone className="h-3 w-3 mr-1" />
            Call
          </Button>
        )}
      </div>

      {/* User location */}
      {userLocation && (
        <div className="pt-3 border-t border-elec-yellow/20">
          <div className="flex items-center text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1 text-elec-yellow/60" />
            <span>Your location: {userLocation}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderInfoOverlay;