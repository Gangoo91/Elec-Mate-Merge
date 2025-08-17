import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PoundSterling, ArrowLeft, RefreshCw, Search } from "lucide-react";
import { useLiveMetalPrices } from "@/hooks/useLiveMetalPrices";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { logger } from "@/utils/logger";
import CompactPricingGrid from "@/components/electrician-pricing/CompactPricingGrid";
import EnhancedRegionalPricing from "@/components/electrician-pricing/EnhancedRegionalPricing";
import CompactMarketAlerts from "@/components/electrician-pricing/CompactMarketAlerts";
import CompactScrapMerchantFinder from "@/components/electrician-pricing/CompactScrapMerchantFinder";

import CommunityPriceSubmission from "@/components/electrician-pricing/CommunityPriceSubmission";

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
    <div className="min-h-screen bg-elec-dark text-foreground overflow-y-auto">
      <div className="p-4 space-y-4">
        <div className="space-y-6 animate-fade-in">
          {/* Compact Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <PoundSterling className="h-7 w-7 text-elec-yellow" />
              <h1 className="text-2xl font-bold tracking-tight">UK Live Pricing</h1>
            </div>
            
            <div className="flex gap-2">
              <Link to="/electrician/business-hub">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
                onClick={refreshPrices}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>

          {/* Compact Scrap Merchant Finder - Always visible */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <div className="p-4">
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5 text-elec-yellow" />
                <h3 className="font-medium">Find Local Scrap Merchants</h3>
              </div>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <CompactScrapMerchantFinder />
              </div>
            </div>
          </Card>

          {/* Enhanced Regional Job Pricing */}
          <EnhancedRegionalPricing />

          {/* Community Price Submission - NEW */}
          <div data-community-form>
            <CommunityPriceSubmission />
          </div>

          {/* Compact Pricing Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-32">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg border border-elec-yellow/20 bg-elec-gray animate-pulse h-full" />
              ))}
            </div>
          ) : data ? (
            <>
              <CompactPricingGrid
                metalPrices={data.metalPrices}
                lastUpdated={data.lastUpdated}
                isLive={data.isLive}
                dataSource={data.dataSource}
              />
            </>
          ) : (
            <Card className="p-6 border-elec-yellow/20 bg-elec-gray text-center">
              <p className="text-muted-foreground mb-4">Could not load UK pricing data</p>
              <Button onClick={refreshPrices} size="sm">Try Again</Button>
            </Card>
          )}

          {/* Compact Market Alerts - Moved to bottom */}
          {data?.marketAlerts && (
            <CompactMarketAlerts alerts={data.marketAlerts} />
          )}

          {/* Compact Disclaimer */}
          <div className="text-xs text-muted-foreground p-3 border border-elec-yellow/20 rounded bg-elec-gray/50">
            <strong>Disclaimer:</strong> Prices are indicative of UK market rates and may vary by supplier and region. 
            Always confirm current prices with your local UK supplier before making purchasing decisions.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePricing;
