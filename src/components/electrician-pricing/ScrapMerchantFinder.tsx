
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SearchForm } from "./merchant-finder/SearchForm";
import { MerchantList } from "./merchant-finder/MerchantList";
import { ApiErrorDisplay, ApiTroubleshooting } from "./merchant-finder/ApiErrorDisplay";

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
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);
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
    setApiErrorMessage(null);
    
    try {
      const { data, error: supabaseError } = await supabase.functions.invoke('find-scrap-merchants', {
        body: { postcode: postcode.trim() }
      });
      
      if (supabaseError) {
        throw new Error(supabaseError.message);
      }
      
      if (data.error) {
        // Store API status code and error message if available
        if (data.details) {
          if (data.details.status) {
            setApiStatus(data.details.status);
          }
          
          if (data.details.message) {
            setApiErrorMessage(data.details.message);
          }
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
          <SearchForm
            postcode={postcode}
            setPostcode={setPostcode}
            handleSearch={handleSearch}
            isLoading={isLoading}
          />
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-md">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <p>{error}</p>
              </div>
              <ApiErrorDisplay apiStatus={apiStatus} apiErrorMessage={apiErrorMessage} />
              
              {apiStatus === 'REQUEST_DENIED' && <ApiTroubleshooting />}
            </div>
          )}
          
          <MerchantList 
            merchants={merchants}
            searchPerformed={searchPerformed}
            isLoading={isLoading}
            error={error}
            openDirections={openDirections}
          />
          
          <div className="text-xs text-muted-foreground mt-2">
            <p>Note: Material acceptance and payment methods are estimated. Please call the merchant to confirm details.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScrapMerchantFinder;
