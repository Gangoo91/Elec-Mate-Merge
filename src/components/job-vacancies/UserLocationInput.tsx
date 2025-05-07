
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Compass } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface UserLocationInputProps {
  userLocation: string | null;
  setUserLocation: (location: string | null) => void;
  searchRadius: number;
  setSearchRadius: (radius: number) => void;
  onLocationConfirmed: () => void;
}

const UserLocationInput: React.FC<UserLocationInputProps> = ({ 
  userLocation, 
  setUserLocation, 
  searchRadius,
  setSearchRadius,
  onLocationConfirmed
}) => {
  const [inputValue, setInputValue] = useState(userLocation || "");
  const [isLocating, setIsLocating] = useState(false);

  const handleUseCurrentLocation = () => {
    if (!window.google?.maps) {
      toast({
        title: "Maps Not Ready",
        description: "Google Maps is still loading. Please try again in a moment.",
        variant: "destructive",
      });
      return;
    }

    setIsLocating(true);
    
    if (!navigator.geolocation) {
      toast({
        title: "Not Available",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      setIsLocating(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Reverse geocode to get postcode
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
          setIsLocating(false);
          
          if (status === "OK" && results && results[0]) {
            // Extract postcode from address components
            const postcodeComponent = results[0].address_components.find(
              component => component.types.includes("postal_code")
            );
            
            const postcode = postcodeComponent ? postcodeComponent.short_name : "";
            const locality = results[0].formatted_address.split(',')[0];
            
            if (postcode) {
              setInputValue(`${locality}, ${postcode}`);
              setUserLocation(`${locality}, ${postcode}`);
              onLocationConfirmed();
            } else {
              toast({
                title: "Location Found",
                description: `Using: ${locality}`,
              });
              setInputValue(locality);
              setUserLocation(locality);
              onLocationConfirmed();
            }
          } else {
            toast({
              title: "Location Error",
              description: "Could not determine your location",
              variant: "destructive",
            });
          }
        });
      },
      (error) => {
        setIsLocating(false);
        console.error("Geolocation error:", error);
        toast({
          title: "Location Error",
          description: error.message || "Failed to get your location",
          variant: "destructive",
        });
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setUserLocation(inputValue.trim());
      onLocationConfirmed();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter your location (city or postcode)"
            className="pl-9 bg-background border-elec-yellow/20"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          className="border-elec-yellow/20"
          onClick={handleUseCurrentLocation}
          disabled={isLocating}
        >
          <Compass className={`h-4 w-4 mr-2 ${isLocating ? 'animate-spin' : ''}`} />
          {isLocating ? "Locating..." : "Current"}
        </Button>
        <Button 
          type="submit" 
          className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
        >
          Find Jobs
        </Button>
      </div>
      
      <div className="flex items-center">
        <span className="text-sm mr-3">Search radius:</span>
        <div className="flex items-center space-x-1">
          {[10, 25, 50, 100].map((radius) => (
            <Button
              key={radius}
              type="button"
              size="sm"
              variant={searchRadius === radius ? "default" : "outline"}
              className={
                searchRadius === radius 
                  ? "bg-elec-yellow text-black hover:bg-elec-yellow/90 h-7 px-2"
                  : "border-elec-yellow/20 h-7 px-2"
              }
              onClick={() => setSearchRadius(radius)}
            >
              {radius} mi
            </Button>
          ))}
        </div>
      </div>
    </form>
  );
};

export default UserLocationInput;
