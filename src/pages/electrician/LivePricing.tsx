import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PoundSterling, ArrowLeft, RefreshCw, Search } from "lucide-react";
import { useLiveMetalPrices } from "@/hooks/useLiveMetalPrices";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { logger } from "@/utils/logger";
import CompactPricingGrid from "@/components/electrician-pricing/CompactPricingGrid";
import EnhancedRegionalPricing from "@/components/electrician-pricing/EnhancedRegionalPricing";
import CompactMarketAlerts from "@/components/electrician-pricing/CompactMarketAlerts";
import CompactScrapMerchantFinder from "@/components/electrician-pricing/CompactScrapMerchantFinder";



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
    <div className="min-h-screen bg-elec-dark text-foreground">
      <div className="p-4 space-y-4">
        <div className="space-y-6 animate-fade-in">
          {/* Compact Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <PoundSterling className="h-7 w-7 text-elec-yellow" />
              <h1 className="text-2xl font-bold tracking-tight">UK Live Pricing</h1>
            </div>
            
            <div className="flex gap-2">
              <Link to="/electrician">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
                onClick={() => refreshPrices(true)}
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

          {/* Enhanced Regional Job Pricing - Complete Tabbed Experience */}
          <EnhancedRegionalPricing />
        </div>
      </div>
    </div>
  );
};

export default LivePricing;
