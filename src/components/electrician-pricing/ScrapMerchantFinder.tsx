
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useScrapMerchantFinder } from "@/hooks/useScrapMerchantFinder";
import { SearchForm } from "./merchant-finder/SearchForm";
import { MerchantList } from "./merchant-finder/MerchantList";
import { ApiErrorDisplay, ApiTroubleshooting } from "./merchant-finder/ApiErrorDisplay";

const ScrapMerchantFinder = () => {
  const {
    postcode,
    setPostcode,
    searchPerformed,
    merchants,
    isLoading,
    error,
    apiStatus,
    apiErrorMessage,
    handleSearch,
    openDirections
  } = useScrapMerchantFinder();
  
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
