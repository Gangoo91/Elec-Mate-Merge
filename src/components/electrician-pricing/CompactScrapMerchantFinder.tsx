
import { useScrapMerchantFinder } from "@/hooks/useScrapMerchantFinder";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Phone, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CompactScrapMerchantFinder = () => {
  const {
    postcode,
    setPostcode,
    searchPerformed,
    merchants,
    isLoading,
    error,
    handleSearch,
    openDirections
  } = useScrapMerchantFinder();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Form */}
      <div className="flex gap-2">
        <Input
          placeholder="Enter UK postcode (e.g., M1 1AA)"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button onClick={handleSearch} disabled={isLoading || !postcode.trim()}>
          {isLoading ? (
            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Results */}
      {searchPerformed && !isLoading && !error && (
        <div className="space-y-3">
          {merchants.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground">
                Found {merchants.length} scrap merchants near {postcode}
              </p>
              
              {merchants.slice(0, 3).map((merchant) => (
                <div 
                  key={merchant.id} 
                  className="p-3 border border-elec-yellow/20 rounded-lg bg-elec-gray/50"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{merchant.name}</h4>
                      <p className="text-sm text-muted-foreground truncate">{merchant.address}</p>
                      
                      <div className="flex items-center gap-4 mt-2 text-xs">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {merchant.distance}
                        </span>
                        {merchant.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {merchant.phone}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {merchant.acceptedMaterials.slice(0, 3).map((material, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {material}
                          </Badge>
                        ))}
                        {merchant.acceptedMaterials.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{merchant.acceptedMaterials.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDirections(merchant)}
                      className="flex-shrink-0"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {merchants.length > 3 && (
                <p className="text-xs text-muted-foreground text-center">
                  And {merchants.length - 3} more merchants...
                </p>
              )}
            </>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              <p className="text-sm">No scrap merchants found in this area.</p>
              <p className="text-xs mt-1">Try a different postcode.</p>
            </div>
          )}
        </div>
      )}
      
      {!searchPerformed && (
        <p className="text-xs text-muted-foreground">
          Enter your postcode to find nearby scrap merchants with current material prices.
        </p>
      )}
    </div>
  );
};

export default CompactScrapMerchantFinder;
