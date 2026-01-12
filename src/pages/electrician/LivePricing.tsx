import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PoundSterling, RefreshCw, Search } from "lucide-react";
import { SmartBackButton } from "@/components/ui/smart-back-button";
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
    <div className="min-h-screen bg-gradient-to-b from-elec-dark via-elec-grey to-elec-dark pt-safe animate-fade-in">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-safe">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
              <PoundSterling className="h-6 w-6 sm:h-7 sm:w-7 text-elec-yellow" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                UK Live Pricing
              </h1>
              <p className="text-sm text-white/60">Real-time market prices & rates</p>
            </div>
          </div>
          <div className="flex gap-2">
            <SmartBackButton />
            <Button
              variant="outline"
              size="sm"
              className="h-10 px-4 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 gap-2 touch-manipulation"
              onClick={() => refreshPrices(true)}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </header>

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
      </main>
    </div>
  );
};

export default LivePricing;
