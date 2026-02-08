import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Search, Send, Recycle, BarChart3, RefreshCw, Zap, MapPin, X, Briefcase, Users } from "lucide-react";
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
import { useJobTypes } from "@/hooks/useJobTypes";

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
  dataSource: "community" | "market" | "estimated";
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
  const [showAllJobs, setShowAllJobs] = useState(false);

  // Get master job types list
  const { data: jobTypesData } = useJobTypes();

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
        dataSource: item.data_source === 'community' ? 'community' : item.sample_size > 3 ? 'market' : 'estimated',
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

  // Merge search results with master job list to show all jobs (even with zero prices)
  const getMergedResults = (): PricingResult[] => {
    if (!lastSearch || !showAllJobs || !jobTypesData?.all) {
      return searchResults;
    }

    const existingJobTypes = new Set(searchResults.map(r => r.jobType.toLowerCase()));
    const postcodeDistrict = lastSearch.postcode.split(' ')[0].toUpperCase();

    // Create empty placeholders for jobs without data
    const emptyPlaceholders: PricingResult[] = jobTypesData.all
      .filter(job => !existingJobTypes.has(job.job_type.toLowerCase()))
      .filter(job => !lastSearch.jobType || job.job_type.toLowerCase().includes(lastSearch.jobType.toLowerCase()))
      .map((job, index) => ({
        id: `empty-${index}`,
        jobType: job.job_type,
        jobCategory: job.job_category,
        minPrice: 0,
        maxPrice: 0,
        avgPrice: 0,
        region: 'UK',
        postcodeDistrict: postcodeDistrict,
        confidenceScore: 0,
        sampleSize: 0,
        lastUpdated: new Date().toISOString(),
        complexityLevel: 'medium' as const,
        dataSource: 'estimated' as const,
      }));

    // Real results first, then empty placeholders
    return [...searchResults, ...emptyPlaceholders];
  };

  const displayResults = getMergedResults();
  const hasRealResults = searchResults.length > 0;
  const emptyJobsCount = displayResults.length - searchResults.length;

  return (
    <div className="bg-neutral-900 flex flex-col   animate-fade-in">
      {/* Offline Indicator */}
      <OfflineIndicator />

      {/* Header - Sticky Premium */}
      <header className="sticky top-0 z-40 bg-neutral-900/95 backdrop-blur-xl border-b border-white/10 ">
        <div className="flex items-center justify-between px-4 h-14">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/electrician/business')}
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
            currentSearch={lastSearch}
          />

          {/* Results */}
          {isSearching ? (
            <SearchResultsSkeleton />
          ) : hasSearched ? (
            displayResults.length > 0 || showAllJobs ? (
              <div className="space-y-4">
                {/* Results Summary Bar - Sticky on scroll */}
                <div className="sticky top-14 z-30 -mx-4 px-4 py-3 bg-neutral-900/95 backdrop-blur-xl border-b border-white/10">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap min-w-0">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-elec-yellow/20 text-elec-yellow text-sm font-bold shrink-0">
                        <MapPin className="h-3.5 w-3.5" />
                        {lastSearch?.postcode}
                      </span>
                      {lastSearch?.jobType && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-400/20 text-blue-400 text-xs font-medium shrink-0">
                          <Briefcase className="h-3 w-3" />
                          {lastSearch.jobType}
                        </span>
                      )}
                      <span className="text-white/60 text-sm">
                        · <span className="font-semibold text-white">{searchResults.length}</span> with prices
                        {showAllJobs && emptyJobsCount > 0 && (
                          <span className="text-white/40"> + {emptyJobsCount} need prices</span>
                        )}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setHasSearched(false);
                        setSearchResults([]);
                        setShowAllJobs(false);
                      }}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all touch-manipulation active:scale-95 shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Show All Jobs Toggle */}
                {jobTypesData?.all && (
                  <button
                    onClick={() => setShowAllJobs(!showAllJobs)}
                    className={cn(
                      "w-full p-3 rounded-xl border transition-all touch-manipulation active:scale-[0.99]",
                      showAllJobs
                        ? "bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow"
                        : "bg-white/5 border-white/10 text-white/70 hover:border-white/20"
                    )}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {showAllJobs ? 'Showing all job types' : 'Show all job types (help add prices!)'}
                      </span>
                    </div>
                  </button>
                )}

                {displayResults.map((result) => (
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
                    dataSource={result.dataSource}
                    onSubmitPrice={() => setActiveTab("submit")}
                  />
                ))}

                {/* Encourage submissions banner at bottom */}
                {hasRealResults && (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-elec-yellow/10 to-amber-500/10 border border-elec-yellow/20">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-elec-yellow/20 flex-shrink-0">
                        <Zap className="h-5 w-5 text-elec-yellow" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white mb-1">Help fellow sparkies!</p>
                        <p className="text-xs text-white/60 mb-3">
                          Submit your real job prices to help electricians across the UK get accurate market rates.
                        </p>
                        <Button
                          onClick={() => setActiveTab("submit")}
                          size="sm"
                          className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold h-9"
                        >
                          Submit a Price
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-10 w-10 text-white/30" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No prices found for this area</h3>
                <p className="text-white/70 text-sm max-w-xs mx-auto mb-6">
                  Be the first to submit prices for {lastSearch?.postcode}! Help build pricing data for your area.
                </p>
                <div className="flex flex-col gap-3 items-center">
                  <Button
                    onClick={() => setActiveTab("submit")}
                    className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-bold px-6 h-12 rounded-xl"
                  >
                    <Zap className="h-5 w-5 mr-2" />
                    Submit a Price
                  </Button>
                  {jobTypesData?.all && (
                    <Button
                      variant="outline"
                      onClick={() => setShowAllJobs(true)}
                      className="border-white/20 text-white/70 hover:text-white h-11"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Browse all job types
                    </Button>
                  )}
                </div>
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
