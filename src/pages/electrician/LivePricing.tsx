
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PoundSterling, ArrowLeft, RefreshCw, Info, MapPin, Search } from "lucide-react";
import LivePricingMetricsCard from "@/components/electrician-pricing/LivePricingMetricsCard";
import ScrapPriceTable from "@/components/electrician-pricing/ScrapPriceTable";
import MarketAlerts from "@/components/electrician-pricing/MarketAlerts";
import { useLiveMetalPrices } from "@/hooks/useLiveMetalPrices";
import ScrapMerchantFinder from "@/components/electrician-pricing/ScrapMerchantFinder";
import { useState } from "react";

const LivePricing = () => {
  const { data, isLoading, refreshPrices } = useLiveMetalPrices();
  const [showMerchantFinder, setShowMerchantFinder] = useState(false);
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center">
          <PoundSterling className="h-8 w-8 text-elec-yellow mr-2" />
          <h1 className="text-3xl font-bold tracking-tight">Live Pricing</h1>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Link to="/electrician/toolbox-talk">
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
            Refresh
          </Button>
        </div>
        
        <Button
          variant="outline"
          className="flex items-center gap-2 w-fit"
          onClick={() => setShowMerchantFinder(!showMerchantFinder)}
        >
          <MapPin className="h-4 w-4" />
          {showMerchantFinder ? "Hide Merchants" : "Find Scrap Merchants"}
        </Button>
      </div>

      {showMerchantFinder && (
        <ScrapMerchantFinder />
      )}

      <div className="border p-4 rounded-lg bg-elec-gray border-elec-yellow/20 flex justify-between items-center">
        <h2 className="text-xl font-medium">Material Market Prices</h2>
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
            <LivePricingMetricsCard title="Metal Prices" metrics={data.metalPrices} />
            <LivePricingMetricsCard title="Cable Prices" metrics={data.cablePrices} />
            <LivePricingMetricsCard title="Equipment Prices" metrics={data.equipmentPrices} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MarketAlerts alerts={data.marketAlerts} />
            <ScrapPriceTable items={data.scrapMetalPrices} />
          </div>
        </>
      ) : (
        <div className="p-8 border rounded-lg bg-elec-gray border-elec-yellow/20 flex flex-col items-center gap-4">
          <Info className="h-12 w-12 text-elec-yellow opacity-70" />
          <p className="text-lg">Could not load pricing data. Please try refreshing.</p>
          <Button onClick={refreshPrices}>Try Again</Button>
        </div>
      )}
      
      <div className="border p-4 rounded-lg bg-elec-gray border-elec-yellow/20">
        <h2 className="text-lg font-medium mb-2">Price Information Disclaimer</h2>
        <p className="text-sm text-muted-foreground">
          Prices shown are indicative only and may vary by supplier and region. Always confirm current
          prices with your local supplier before making purchasing decisions. Market data is provided
          for informational purposes only and should not be considered as financial advice.
        </p>
      </div>
    </div>
  );
};

export default LivePricing;
