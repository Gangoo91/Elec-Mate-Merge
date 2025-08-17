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

          {/* Enhanced Regional Job Pricing */}
          <EnhancedRegionalPricing />

          {/* Community Price Submission - Enhanced with better instructions */}
          <div data-community-form>
            <Card className="border-elec-yellow/20 bg-elec-gray mb-4">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-elec-yellow" />
                  <h3 className="font-medium text-white">Share Pricing with Fellow Electricians</h3>
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  Help build the most accurate UK electrical pricing database by sharing recent job quotes from your area. 
                  Your submissions help fellow electricians stay competitive.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                    <span>Anonymous submissions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                    <span>Reviewed before publication</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                    <span>Builds regional estimates</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <CommunityPriceSubmission />
          </div>

          {/* Compact Pricing Grid */}
          {isLoading ? (
            <Card className="border-elec-yellow/20 bg-elec-gray p-6">
              <div className="text-center">
                <div className="animate-spin h-8 w-8 border-2 border-elec-yellow border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-400">Loading UK metal prices...</p>
                <p className="text-xs text-gray-500 mt-2">Fetching live pricing data from MetalPriceAPI</p>
              </div>
            </Card>
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
              <div className="space-y-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-orange-400 text-xl">⚠️</span>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-2">Metal Pricing Temporarily Unavailable</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    We're experiencing issues with the live pricing API. This typically resolves within a few minutes.
                  </p>
                  <Button onClick={() => refreshPrices(true)} size="sm" className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
                    Try Again
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Compact Market Alerts - Moved to bottom */}
          {data?.marketAlerts && (
            <CompactMarketAlerts alerts={data.marketAlerts} />
          )}

          {/* Compact Disclaimer */}
          <div className="text-xs text-muted-foreground p-4 border border-elec-yellow/20 rounded bg-elec-gray/50">
            <div className="mb-3">
              <strong>Important Disclaimer:</strong> Prices shown are indicative of UK market rates and may vary significantly by supplier, region, and quantity. 
              Always confirm current prices with your local UK supplier before making purchasing decisions.
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-elec-yellow/10">
              <div>
                <h4 className="font-medium text-white text-sm mb-2">For Scrap Metal Sales:</h4>
                <ul className="text-xs space-y-1 text-gray-400">
                  <li>• Prices vary by metal grade and condition</li>
                  <li>• Call ahead to confirm current rates</li>
                  <li>• Bring ID and proof of ownership</li>
                  <li>• Higher grades command better prices</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white text-sm mb-2">Community Pricing:</h4>
                <ul className="text-xs space-y-1 text-gray-400">
                  <li>• Job prices from real UK electricians</li>
                  <li>• Regional variations included</li>
                  <li>• Updated with new submissions</li>
                  <li>• Use as guidance only</li>
                </ul>
              </div>
            </div>
            
            {/* Debug Information */}
            {data && (
              <div className="mt-4 pt-3 border-t border-elec-yellow/10 text-xs opacity-75">
                <details className="cursor-pointer">
                  <summary className="font-medium text-gray-400 hover:text-white">Debug Information</summary>
                  <div className="mt-2 space-y-1">
                    <div>API Provider: {data.apiProvider}</div>
                    <div>API Key: ...{data.apiKeySuffix}</div>
                    <div>Tried Live: {data.triedLive ? 'Yes' : 'No'}</div>
                    <div>Data Source: {data.dataSource}</div>
                    {data.liveAttemptError && <div className="text-orange-400">Live Error: {data.liveAttemptError}</div>}
                  </div>
                </details>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePricing;
