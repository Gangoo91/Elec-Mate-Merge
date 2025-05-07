
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Phone, ExternalLink, Loader2, Info, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ScrapMerchant {
  id: number;
  name: string;
  address: string;
  distance: string;
  phone: string;
  rating: number;
  openNow: boolean;
  paymentMethods: string[];
  acceptedMaterials: string[];
  placeId?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

const ScrapMerchantFinder = () => {
  const [postcode, setPostcode] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [merchants, setMerchants] = useState<ScrapMerchant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!postcode.trim()) {
      toast({
        title: "Postcode required",
        description: "Please enter a valid UK postcode to search",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setApiStatus(null);
    
    try {
      const { data, error: supabaseError } = await supabase.functions.invoke('find-scrap-merchants', {
        body: { postcode: postcode.trim() }
      });
      
      if (supabaseError) {
        throw new Error(supabaseError.message);
      }
      
      if (data.error) {
        // Store API status code if available
        if (data.details && data.details.status) {
          setApiStatus(data.details.status);
        }
        
        throw new Error(data.error);
      }
      
      if (data.merchants && data.merchants.length > 0) {
        setMerchants(data.merchants);
        toast({
          title: "Search complete",
          description: `Found ${data.merchants.length} scrap merchants in your area`,
        });
      } else {
        setMerchants([]);
        toast({
          title: "No results found",
          description: "No scrap merchants found in this area. Try a different postcode.",
          variant: "destructive"
        });
      }
      
    } catch (err) {
      console.error("Error searching for scrap merchants:", err);
      
      // Extract the error message
      const errorMsg = err instanceof Error ? err.message : "Failed to search for merchants";
      setError(errorMsg);
      setMerchants([]);
      
      toast({
        title: "Search failed",
        description: errorMsg,
        variant: "destructive"
      });
      
    } finally {
      setIsLoading(false);
      setSearchPerformed(true);
    }
  };

  const openDirections = (merchant: ScrapMerchant) => {
    if (merchant.location) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${merchant.location.lat},${merchant.location.lng}`, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(merchant.name + ' ' + merchant.address)}`, '_blank');
    }
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, index) => {
          const starValue = index + 1;
          return (
            <svg 
              key={index} 
              className={`h-4 w-4 ${starValue <= rating ? "text-yellow-400" : "text-gray-300"}`}
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        })}
        <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
      </div>
    );
  };
  
  const renderApiErrorHelp = () => {
    if (!apiStatus) return null;
    
    switch(apiStatus) {
      case 'REQUEST_DENIED':
        return (
          <Alert className="mt-4 bg-amber-500/10 border-amber-500/30 text-amber-500">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              API authorization issue detected. Please ensure your Google Maps API key has the Geocoding and Places APIs enabled and has no restrictions that would block this request.
            </AlertDescription>
          </Alert>
        );
      case 'OVER_QUERY_LIMIT':
        return (
          <Alert className="mt-4 bg-amber-500/10 border-amber-500/30 text-amber-500">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              The Google Maps API usage quota has been exceeded. Please try again later or check your billing settings.
            </AlertDescription>
          </Alert>
        );
      default:
        return null;
    }
  };
  
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-elec-yellow" />
          Find Local Scrap Merchants
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input 
              placeholder="Enter your UK postcode" 
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              className="max-w-xs"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <Button 
              onClick={handleSearch} 
              disabled={isLoading}
              className="flex items-center gap-1 sm:w-auto w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </>
              )}
            </Button>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-md">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <p>{error}</p>
              </div>
              {renderApiErrorHelp()}
            </div>
          )}
          
          {searchPerformed && merchants.length === 0 && !isLoading && !error && (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No merchants found near this location.</p>
            </div>
          )}
          
          {merchants.length > 0 && (
            <div className="space-y-4">
              {merchants.map((merchant) => (
                <div 
                  key={merchant.id} 
                  className="border border-elec-yellow/20 rounded-lg p-4 bg-black/10"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{merchant.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {merchant.address} ({merchant.distance})
                      </p>
                    </div>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      merchant.openNow ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }`}>
                      {merchant.openNow ? "Open Now" : "Closed"}
                    </span>
                  </div>
                  
                  <div className="mt-2">
                    {renderStarRating(merchant.rating)}
                  </div>
                  
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Accepts</p>
                      <p className="text-sm">{merchant.acceptedMaterials.join(", ")}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Payment</p>
                      <p className="text-sm">{merchant.paymentMethods.join(", ")}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex items-center gap-1"
                      disabled={merchant.phone === 'Not available'}
                      onClick={() => window.open(`tel:${merchant.phone}`, '_blank')}
                    >
                      <Phone className="h-3 w-3" />
                      <span>{merchant.phone === 'Not available' ? 'No Phone' : merchant.phone}</span>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex items-center gap-1"
                      onClick={() => openDirections(merchant)}
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>Directions</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-xs text-muted-foreground mt-2">
            <p>Note: Material acceptance and payment methods are estimated. Please call the merchant to confirm details.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScrapMerchantFinder;
