import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Search, Send, Recycle, BarChart3, RefreshCw, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// UI Components
import SwipeableTabs from "@/components/live-pricing/ui/SwipeableTabs";
import { SearchResultsSkeleton } from "@/components/live-pricing/ui/PricingSkeleton";
import OfflineIndicator from "@/components/live-pricing/ui/OfflineIndicator";
import PricingErrorBoundary from "@/components/live-pricing/ui/PricingErrorBoundary";

// Tab Components
import PricingSearchBar from "@/components/live-pricing/pricing/PricingSearchBar";
import PriceCard from "@/components/live-pricing/pricing/PriceCard";
import QuickSubmitForm from "@/components/live-pricing/submit/QuickSubmitForm";
import MetalPricesGrid from "@/components/live-pricing/scrap/MetalPricesGrid";
import InsightsDashboard from "@/components/live-pricing/insights/InsightsDashboard";
import CompactScrapMerchantFinder from "@/components/electrician-pricing/CompactScrapMerchantFinder";

// Hooks
import { supabase } from "@/integrations/supabase/client";

interface PricingResult {
  id: string;
  jobType: string;
  jobCategory: string;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  region: string;
  postcodeDistrict: string;
  confidenceScore: number;
  sampleSize: number;
  lastUpdated: string;
  complexityLevel: "simple" | "medium" | "complex";
}

const tabs = [
  { id: "pricing", label: "Pricing", icon: <Search className="h-5 w-5" /> },
  { id: "submit", label: "Submit", icon: <Send className="h-5 w-5" /> },
  { id: "scrap", label: "Scrap", icon: <Recycle className="h-5 w-5" /> },
  { id: "insights", label: "Insights", icon: <BarChart3 className="h-5 w-5" /> },
];

const LivePricingHub = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "pricing";
  const setActiveTab = (tab: string) => setSearchParams({ tab }, { replace: false });
  const [searchResults, setSearchResults] = useState<PricingResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [lastSearch, setLastSearch] = useState<{ postcode: string; jobType?: string } | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSearch = async (postcode: string, jobType?: string) => {
    setIsSearching(true);
    setLastSearch({ postcode, jobType });
    setHasSearched(true);

    try {
      // Extract postcode district (first part)
      const postcodeDistrict = postcode.split(' ')[0].toUpperCase();

      let query = supabase
        .from('enhanced_regional_pricing')
        .select('*')
        .or(`postcode_district.ilike.${postcodeDistrict}%,postcode_district.ilike.${postcodeDistrict.slice(0, 2)}%`)
        .order('confidence_score', { ascending: false })
        .limit(20);

      if (jobType) {
        query = query.ilike('job_type', `%${jobType}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      const results: PricingResult[] = (data || []).map((item: any) => ({
        id: item.id,
        jobType: item.job_type,
        jobCategory: item.job_category,
        minPrice: item.min_price,
        maxPrice: item.max_price,
        avgPrice: item.avg_price,
        region: item.region || 'UK',
        postcodeDistrict: item.postcode_district,
        confidenceScore: item.confidence_score || 70,
        sampleSize: item.sample_size || 1,
        lastUpdated: item.updated_at || item.created_at,
        complexityLevel: item.complexity_level || 'medium',
      }));

      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleRefresh = () => {
    if (lastSearch) {
      handleSearch(lastSearch.postcode, lastSearch.jobType);
    }
  };

  const handlePullToRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Refresh based on active tab
      if (activeTab === "pricing" && lastSearch) {
        await handleSearch(lastSearch.postcode, lastSearch.jobType);
      }
      // For other tabs, just wait a bit to simulate refresh
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col pt-safe pb-safe">
      {/* Offline Indicator */}
      <OfflineIndicator />

      {/* Header - Sticky Premium */}
      <header className="sticky top-0 z-40 bg-neutral-900/95 backdrop-blur-xl border-b border-white/10 pt-safe">
        <div className="flex items-center justify-between px-4 h-14">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/electrician')}
            className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.95]"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center">
              <Zap className="h-4 w-4 text-black" />
            </div>
            <h1 className="font-bold text-lg text-white">Live Pricing</h1>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            disabled={isSearching || !lastSearch}
            className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.95] disabled:opacity-30"
          >
            <RefreshCw className={cn("h-5 w-5", isSearching && "animate-spin")} />
          </Button>
        </div>
      </header>

      {/* Main Content with Swipeable Tabs */}
      <PricingErrorBoundary>
        <SwipeableTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="flex-1"
          onRefresh={handlePullToRefresh}
          isRefreshing={isRefreshing}
        >
        {/* Tab 1: Pricing Search */}
        <div className="px-4 py-6 space-y-6">
          <PricingSearchBar
            onSearch={handleSearch}
            isLoading={isSearching}
          />

          {/* Results */}
          {isSearching ? (
            <SearchResultsSkeleton />
          ) : hasSearched ? (
            searchResults.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white">
                    <span className="font-bold text-yellow-400">{searchResults.length}</span> results for{" "}
                    <span className="font-semibold">{lastSearch?.postcode}</span>
                    {lastSearch?.jobType && (
                      <span className="text-yellow-400"> · {lastSearch.jobType}</span>
                    )}
                  </p>
                </div>

                {searchResults.map((result) => (
                  <PriceCard
                    key={result.id}
                    jobType={result.jobType}
                    jobCategory={result.jobCategory}
                    minPrice={result.minPrice}
                    maxPrice={result.maxPrice}
                    avgPrice={result.avgPrice}
                    region={result.region}
                    postcodeDistrict={result.postcodeDistrict}
                    confidenceScore={result.confidenceScore}
                    sampleSize={result.sampleSize}
                    lastUpdated={result.lastUpdated}
                    complexityLevel={result.complexityLevel}
                    onSubmitPrice={() => setActiveTab("submit")}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-10 w-10 text-white/30" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
                <p className="text-white/70 text-sm max-w-xs mx-auto mb-6">
                  Try a different postcode or broader search. You can also help by submitting prices for this area.
                </p>
                <Button
                  onClick={() => setActiveTab("submit")}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black font-bold px-6 h-12 rounded-xl"
                >
                  Submit a Price
                </Button>
              </div>
            )
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-2xl bg-yellow-400/10 flex items-center justify-center mx-auto mb-4">
                <Search className="h-10 w-10 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Search Job Pricing</h3>
              <p className="text-white/70 text-sm max-w-xs mx-auto">
                Enter a postcode to see what electricians are charging in that area.
              </p>
            </div>
          )}
        </div>

        {/* Tab 2: Submit Prices */}
        <div className="px-4 py-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Submit Job Price</h2>
            <p className="text-white/70">
              Help the community by sharing your actual pricing data
            </p>
          </div>

          <QuickSubmitForm
            onSuccess={() => {
              // Price submitted successfully
            }}
            onNavigateToInsights={() => setActiveTab("insights")}
          />
        </div>

        {/* Tab 3: Scrap Metal */}
        <div className="px-4 py-6 space-y-6">
          <MetalPricesGrid />

          <div className="pt-6 border-t border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Find Scrap Merchants</h3>
            <CompactScrapMerchantFinder />
          </div>
        </div>

        {/* Tab 4: Insights */}
        <div className="px-4 py-6">
          <InsightsDashboard />
        </div>
        </SwipeableTabs>
      </PricingErrorBoundary>
    </div>
  );
};

export default LivePricingHub;
