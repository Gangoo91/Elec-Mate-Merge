
import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, X, ExternalLink, Phone } from "lucide-react";
import { ApiErrorDisplay } from "../electrician-pricing/merchant-finder/ApiErrorDisplay";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

interface TrainingProvider {
  id: string;
  name: string;
  vicinity: string;
  rating?: number;
  place_id: string;
  phone?: string;
  website?: string;
  address?: string;
  photos?: google.maps.places.PlacePhoto[];
}

interface TrainingProviderMapProps {
  onClose: () => void;
}

const TrainingProviderMap: React.FC<TrainingProviderMapProps> = ({ onClose }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const [postcode, setPostcode] = useState<string>("");
  const [providers, setProviders] = useState<TrainingProvider[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<TrainingProvider | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [mapInitialized, setMapInitialized] = useState<boolean>(false);

  // Initialize Google Maps
  useEffect(() => {
    const initMap = () => {
      if (!window.google?.maps || !mapRef.current) {
        console.error("Google Maps not loaded or map container not found");
        setApiError("Google Maps could not be initialized. Please reload the page.");
        return;
      }
      
      try {
        console.log("Initializing Google Maps...");
        googleMapRef.current = new window.google.maps.Map(mapRef.current, {
          center: { lat: 54.7023545, lng: -3.2765753 }, // Default to UK center
          zoom: 7,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
        });
        
        geocoderRef.current = new window.google.maps.Geocoder();
        setMapInitialized(true);
        console.log("Map initialized successfully");
        
        // Try to get user's location for better initial positioning
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              
              if (googleMapRef.current) {
                googleMapRef.current.setCenter(userLocation);
                googleMapRef.current.setZoom(10);
                
                // Create a marker for user's location
                new window.google.maps.Marker({
                  position: userLocation,
                  map: googleMapRef.current,
                  icon: {
                    url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    scaledSize: new window.google.maps.Size(24, 24)
                  },
                  title: "Your approximate location"
                });
              }
            },
            (error) => {
              console.log("Geolocation error:", error);
              toast.error("Location access denied", {
                description: "Using default UK map view"
              });
            }
          );
        }
        
      } catch (error) {
        console.error("Error initializing Google Maps:", error);
        setApiError("Failed to initialize Google Maps: " + (error instanceof Error ? error.message : "Unknown error"));
      }
    };

    // Ensure Google Maps is loaded before initializing
    if (window.google?.maps) {
      initMap();
    } else {
      const checkGoogleMaps = setInterval(() => {
        if (window.google?.maps) {
          clearInterval(checkGoogleMaps);
          initMap();
        }
      }, 500);

      // Safety timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkGoogleMaps);
        if (!window.google?.maps) {
          console.error("Google Maps failed to load after timeout");
          setApiError("Google Maps could not be loaded. Please check your internet connection and reload the page.");
        }
      }, 10000);
    }

    return () => {
      // Clean up markers
      markersRef.current.forEach(marker => marker.setMap(null));
    };
  }, []);

  const searchProviders = async () => {
    if (!mapInitialized) {
      toast.error("Map not initialized", {
        description: "Please wait for the map to load or reload the page"
      });
      return;
    }

    if (!googleMapRef.current || !geocoderRef.current) {
      setApiError("Map services are not available. Please reload the page.");
      return;
    }
    
    if (!postcode.trim()) {
      toast.error("Postcode required", {
        description: "Please enter a valid UK postcode"
      });
      return;
    }
    
    setIsLoading(true);
    setApiError(null);
    setApiStatus(null);
    setSelectedProvider(null);
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    
    try {
      console.log("Searching for providers with postcode:", postcode);
      // Geocode the postcode to get coordinates
      geocoderRef.current.geocode({ address: `${postcode}, UK` }, async (results, status) => {
        if (status === "OK" && results && results[0]) {
          const location = results[0].geometry.location;
          console.log("Geocoded location:", location.toString());
          
          if (googleMapRef.current) {
            googleMapRef.current.setCenter(location);
            googleMapRef.current.setZoom(12);
            
            // Use Places API to find training providers
            const service = new window.google.maps.places.PlacesService(googleMapRef.current);
            
            service.nearbySearch(
              {
                location: location,
                radius: 15000, // 15km radius
                keyword: "electrical training provider college apprenticeship",
                type: "school"
              },
              (results, status) => {
                setIsLoading(false);
                
                if (status === "OK" && results && results.length > 0) {
                  console.log("Found providers:", results.length);
                  const trainingProviders = results.map(place => ({
                    id: place.place_id || `place-${Math.random().toString(36).substr(2, 9)}`,
                    name: place.name || "Unknown Provider",
                    vicinity: place.vicinity || "Address not available",
                    rating: place.rating,
                    place_id: place.place_id || ""
                  }));
                  
                  setProviders(trainingProviders);
                  
                  // Create markers for each provider
                  trainingProviders.forEach(provider => {
                    const place = results.find(p => p.place_id === provider.place_id);
                    if (!place || !place.geometry?.location) return;
                    
                    const marker = new window.google.maps.Marker({
                      position: place.geometry.location,
                      map: googleMapRef.current as google.maps.Map,
                      title: provider.name,
                      animation: window.google.maps.Animation.DROP,
                      icon: {
                        url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                      }
                    });
                    
                    // Add click listener to marker
                    marker.addListener("click", () => {
                      setSelectedProvider(provider);
                      
                      // Get more details about this place
                      service.getDetails(
                        { placeId: provider.place_id },
                        (placeResult, detailsStatus) => {
                          if (detailsStatus === "OK" && placeResult) {
                            setSelectedProvider({
                              ...provider,
                              phone: placeResult.formatted_phone_number,
                              website: placeResult.website,
                              address: placeResult.formatted_address,
                              photos: placeResult.photos
                            });
                          }
                        }
                      );
                    });
                    
                    markersRef.current.push(marker);
                  });
                  
                  toast.success(`Found ${trainingProviders.length} training providers near ${postcode}`);
                } else {
                  console.error("Places API error:", status);
                  setApiStatus(status);
                  setApiError("Failed to find training providers. Please try another postcode.");
                  toast.error("Unable to find training providers", {
                    description: "Try another postcode or search term"
                  });
                }
              }
            );
          }
        } else {
          console.error("Geocoder error:", status);
          setIsLoading(false);
          setApiStatus(status);
          setApiError("Invalid postcode or location not found. Please try again.");
          toast.error("Invalid postcode", {
            description: "Please enter a valid UK postcode"
          });
        }
      });
    } catch (error) {
      console.error("Error searching for training providers:", error);
      setIsLoading(false);
      setApiError("An error occurred while searching for training providers: " + 
        (error instanceof Error ? error.message : "Unknown error"));
      toast.error("Service error", {
        description: "There was a problem with the mapping service"
      });
    }
  };

  const handlePostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostcode(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchProviders();
    }
  };

  const handleProviderClick = (provider: TrainingProvider) => {
    setSelectedProvider(provider);
    
    // Find the marker for this provider and center the map on it
    const marker = markersRef.current.find(m => m.getTitle() === provider.name);
    if (marker && googleMapRef.current) {
      googleMapRef.current.panTo(marker.getPosition() as google.maps.LatLng);
      googleMapRef.current.setZoom(14);
    }

    // If we haven't loaded detailed info yet, load it now
    if (googleMapRef.current && !provider.phone) {
      const service = new window.google.maps.places.PlacesService(googleMapRef.current);
      service.getDetails(
        { placeId: provider.place_id },
        (placeResult, status) => {
          if (status === "OK" && placeResult) {
            setSelectedProvider({
              ...provider,
              phone: placeResult.formatted_phone_number,
              website: placeResult.website,
              address: placeResult.formatted_address,
              photos: placeResult.photos
            });
          }
        }
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-elec-gray border-elec-yellow/20">
        <div className="flex items-center justify-between p-4 border-b border-elec-yellow/20">
          <h2 className="text-lg font-medium flex items-center gap-2">
            <MapPin className="h-5 w-5 text-elec-yellow" />
            Find Local Training Providers
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-4 border-b border-elec-yellow/20">
          <div className="flex gap-2">
            <Input
              placeholder="Enter postcode..."
              value={postcode}
              onChange={handlePostcodeChange}
              onKeyDown={handleKeyDown}
              className="bg-elec-dark/40"
            />
            <Button 
              onClick={searchProviders} 
              disabled={isLoading || !mapInitialized}
              className="bg-elec-yellow hover:bg-elec-yellow/80 text-elec-dark"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-elec-dark/30 border-t-elec-dark animate-spin rounded-full"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </div>
              )}
            </Button>
          </div>
          {apiError && <ApiErrorDisplay apiStatus={apiStatus} apiErrorMessage={apiError} />}
          {!mapInitialized && !apiError && (
            <div className="mt-2 p-2 bg-yellow-500/10 text-yellow-500 text-sm rounded flex items-center gap-2">
              <div className="h-3 w-3 border-2 border-yellow-500/30 border-t-yellow-500 animate-spin rounded-full"></div>
              <span>Initializing map...</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 flex-1 overflow-hidden">
          <div className="md:col-span-1 max-h-[60vh] md:max-h-[70vh] overflow-y-auto p-2 border-r border-elec-yellow/10">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full p-4">
                <div className="h-8 w-8 border-4 border-elec-yellow/30 border-t-elec-yellow animate-spin rounded-full mb-4"></div>
                <p className="text-sm text-muted-foreground">Searching for training providers...</p>
              </div>
            ) : providers.length > 0 ? (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground p-2">Found {providers.length} training providers</p>
                {providers.map(provider => (
                  <div
                    key={provider.id}
                    className={`p-3 rounded-md cursor-pointer transition-colors ${
                      selectedProvider?.id === provider.id ? "bg-elec-yellow/20" : "hover:bg-elec-dark/40"
                    }`}
                    onClick={() => handleProviderClick(provider)}
                  >
                    <h3 className="font-medium text-sm">{provider.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{provider.vicinity}</p>
                    {provider.rating && (
                      <div className="flex items-center gap-1 mt-1">
                        <div className="text-yellow-500 text-xs">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i}>
                              {i < Math.floor(provider.rating as number) ? "★" : "☆"}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs">({provider.rating})</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              !isLoading && (
                <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                  <MapPin className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Enter a postcode to find training providers</p>
                </div>
              )
            )}
          </div>
          
          <div className="md:col-span-2 h-[60vh] md:h-[70vh] relative">
            <div ref={mapRef} className="w-full h-full"></div>
            {!mapInitialized && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="p-4 bg-elec-dark rounded-md shadow-lg">
                  <div className="h-6 w-6 border-4 border-elec-yellow/30 border-t-elec-yellow animate-spin rounded-full mx-auto mb-2"></div>
                  <p className="text-sm text-center">Loading map...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {selectedProvider && (
          <div className="p-4 border-t border-elec-yellow/20 bg-elec-dark/30">
            <h3 className="font-medium">{selectedProvider.name}</h3>
            <p className="text-sm text-muted-foreground">{selectedProvider.address || selectedProvider.vicinity}</p>
            
            <div className="flex flex-wrap justify-between items-center mt-3 gap-2">
              <div className="flex flex-col gap-2">
                {selectedProvider.rating && (
                  <div className="flex items-center gap-1">
                    <div className="text-yellow-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>
                          {i < Math.floor(selectedProvider.rating as number) ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm">({selectedProvider.rating})</span>
                  </div>
                )}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {selectedProvider.phone && (
                    <a 
                      href={`tel:${selectedProvider.phone}`} 
                      className="flex items-center gap-1 text-elec-yellow hover:underline"
                    >
                      <Phone className="h-3 w-3" />
                      <span>{selectedProvider.phone}</span>
                    </a>
                  )}
                  {selectedProvider.website && (
                    <a 
                      href={selectedProvider.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-elec-yellow hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>Visit website</span>
                    </a>
                  )}
                </div>
              </div>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10">
                    Enquire About Apprenticeships
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-elec-gray border-elec-yellow/20">
                  <div className="space-y-3">
                    <h4 className="font-medium">Contact {selectedProvider.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      Get in touch with this training provider to discuss apprenticeship opportunities.
                    </p>
                    <div className="grid gap-2">
                      <Button className="w-full bg-elec-yellow hover:bg-elec-yellow/80 text-elec-dark">
                        Send Enquiry
                      </Button>
                      <Button variant="outline" className="w-full border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10">
                        Save Contact Information
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TrainingProviderMap;
