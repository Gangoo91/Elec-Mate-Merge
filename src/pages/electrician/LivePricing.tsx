
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PoundSterling, ArrowLeft, RefreshCw, Info, MapPin, Search } from "lucide-react";
import LivePricingMetricsCard from "@/components/electrician-pricing/LivePricingMetricsCard";
import MarketAlerts from "@/components/electrician-pricing/MarketAlerts";
import RegionalJobPricing from "@/components/electrician-pricing/RegionalJobPricing";
import { useLiveMetalPrices } from "@/hooks/useLiveMetalPrices";
import ScrapMerchantFinder from "@/components/electrician-pricing/ScrapMerchantFinder";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { logger } from "@/utils/logger";

const LivePricing = () => {
  const { data, isLoading, refreshPrices } = useLiveMetalPrices();
  const [showMerchantFinder, setShowMerchantFinder] = useState(false);
  
  // Debug logging for data changes
  useEffect(() => {
    logger.info('LivePricing component data updated:', {
      hasData: !!data,
      isLoading,
      regionalJobPricingCount: data?.regionalJobPricing?.length || 0,
      dataStructure: data ? Object.keys(data) : []
    });
  }, [data, isLoading]);
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center">
          <PoundSterling className="h-8 w-8 text-elec-yellow mr-2" />
          <h1 className="text-3xl font-bold tracking-tight">UK Live Pricing</h1>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Link to="/electrician/trade-essentials">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={refreshPrices}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh UK Prices
          </Button>
        </div>
        
        <Card className="p-4 border-elec-yellow/20 bg-elec-gray">
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <MapPin className="h-5 w-5 text-elec-yellow" />
              Find UK Scrap Merchants Near You
            </h3>
            <p className="text-sm text-muted-foreground">
              Search for nearby scrap merchants using your UK postcode to get current prices for your materials.
            </p>
            <Button
              variant={showMerchantFinder ? "secondary" : "default"}
              className="w-fit flex items-center gap-2"
              onClick={() => setShowMerchantFinder(!showMerchantFinder)}
            >
              <Search className="h-4 w-4" />
              {showMerchantFinder ? "Hide Merchant Finder" : "Find Local Scrap Merchants"}
            </Button>
          </div>
        </Card>
      </div>

      {showMerchantFinder && (
        <ScrapMerchantFinder />
      )}

      <div className="border p-4 rounded-lg bg-elec-gray border-elec-yellow/20 flex justify-between items-center">
        <h2 className="text-xl font-medium">UK Material Market Prices</h2>
        <div className="text-sm text-muted-foreground">Last updated: {data?.lastUpdated || "Loading..."}</div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-48">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border border-elec-yellow/20 bg-elec-gray animate-pulse h-full" />
          ))}
        </div>
      ) : data ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <LivePricingMetricsCard title="UK Metal Prices" metrics={data.metalPrices} />
            <LivePricingMetricsCard title="UK Cable Prices" metrics={data.cablePrices} />
            <LivePricingMetricsCard title="UK Equipment Prices" metrics={data.equipmentPrices} />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <MarketAlerts alerts={data.marketAlerts} />
          </div>

          {/* Enhanced Regional Job Pricing Section with debugging */}
          <div className="space-y-4">
            {/* Debug information in development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-lg text-sm">
                <h4 className="font-semibold">Debug Information:</h4>
                <p>Regional Job Pricing Data: {data.regionalJobPricing ? data.regionalJobPricing.length : 0} items</p>
                <p>Has regionalJobPricing: {data.regionalJobPricing ? 'Yes' : 'No'}</p>
                <p>Data keys: {Object.keys(data).join(', ')}</p>
              </div>
            )}

            {/* Show Regional Job Pricing with improved conditional logic */}
            {data.regionalJobPricing && Array.isArray(data.regionalJobPricing) ? (
              data.regionalJobPricing.length > 0 ? (
                <RegionalJobPricing regionalData={data.regionalJobPricing} />
              ) : (
                <Card className="p-8 border-elec-yellow/20 bg-elec-gray">
                  <div className="text-center">
                    <Info className="h-12 w-12 mx-auto mb-4 text-elec-yellow opacity-70" />
                    <h3 className="text-lg font-medium mb-2">Regional Job Pricing Data</h3>
                    <p className="text-muted-foreground">
                      Regional job pricing data is currently being updated. Please check back later.
                    </p>
                  </div>
                </Card>
              )
            ) : (
              <Card className="p-8 border-elec-yellow/20 bg-elec-gray">
                <div className="text-center">
                  <Info className="h-12 w-12 mx-auto mb-4 text-elec-yellow opacity-70" />
                  <h3 className="text-lg font-medium mb-2">Loading Regional Job Pricing</h3>
                  <p className="text-muted-foreground">
                    We're loading UK regional job pricing data. This feature provides pricing information across different UK regions.
                  </p>
                  <Button 
                    onClick={refreshPrices} 
                    className="mt-4"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Loading...' : 'Retry Loading Data'}
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </>
      ) : (
        <div className="p-8 border rounded-lg bg-elec-gray border-elec-yellow/20 flex flex-col items-center gap-4">
          <Info className="h-12 w-12 text-elec-yellow opacity-70" />
          <p className="text-lg">Could not load UK pricing data. Please try refreshing.</p>
          <Button onClick={refreshPrices}>Try Again</Button>
        </div>
      )}
      
      <div className="border p-4 rounded-lg bg-elec-gray border-elec-yellow/20">
        <h2 className="text-lg font-medium mb-2">UK Price Information Disclaimer</h2>
        <p className="text-sm text-muted-foreground">
          Prices shown are indicative of UK market rates and may vary by supplier and region. Always confirm current
          prices with your local UK supplier before making purchasing decisions. Market data is provided
          for informational purposes only and should not be considered as financial advice.
        </p>
      </div>
    </div>
  );
};

export default LivePricing;
