import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';

// Layout
import HorizontalTabs from '@/components/business-hub/HorizontalTabs';
import OfflineIndicator from '@/components/live-pricing/ui/OfflineIndicator';
import PricingErrorBoundary from '@/components/live-pricing/ui/PricingErrorBoundary';

// Tab Components
import BenchmarkExplorer from '@/components/live-pricing/pricing/BenchmarkExplorer';
import QuickSubmitForm from '@/components/live-pricing/submit/QuickSubmitForm';
import MetalPricesGrid from '@/components/live-pricing/scrap/MetalPricesGrid';
import InsightsDashboard from '@/components/live-pricing/insights/InsightsDashboard';
import CompactScrapMerchantFinder from '@/components/electrician-pricing/CompactScrapMerchantFinder';

const tabs = [
  { id: 'pricing', label: 'Pricing' },
  { id: 'submit', label: 'Submit' },
  { id: 'scrap', label: 'Scrap' },
  { id: 'insights', label: 'Insights' },
];

const LivePricingHub = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'pricing';
  const setActiveTab = (tab: string) => setSearchParams({ tab }, { replace: false });

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['live-pricing-benchmarks'] });
    queryClient.invalidateQueries({ queryKey: ['live-pricing-insights'] });
    queryClient.invalidateQueries({ queryKey: ['live-pricing-my-stats'] });
  };

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background min-h-screen pb-24 animate-fade-in">
      {/* Offline Indicator */}
      <OfflineIndicator />

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/electrician/business')}
            className="h-11 w-11 flex items-center justify-center rounded-xl bg-white/[0.06] touch-manipulation active:bg-white/[0.1] transition-colors flex-shrink-0"
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-white truncate">Live Pricing</h1>
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            className="h-11 w-11 flex items-center justify-center rounded-xl bg-white/[0.06] touch-manipulation active:bg-white/[0.1] transition-colors flex-shrink-0"
          >
            <RefreshCw className={cn('h-5 w-5 text-white')} />
          </button>
        </div>
      </header>

      {/* Top Tabs */}
      <div className="sticky top-[56px] z-30 bg-background/95 backdrop-blur-sm border-b border-white/10 px-4 py-2">
        <HorizontalTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Tab Content */}
      <PricingErrorBoundary>
        <main className="px-4 sm:px-6 py-4">
          {/* Pricing Tab */}
          {activeTab === 'pricing' && (
            <div className="animate-fade-in">
              <BenchmarkExplorer onSubmitPrice={() => setActiveTab('submit')} />
            </div>
          )}

          {/* Submit Tab */}
          {activeTab === 'submit' && (
            <div className="animate-fade-in">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Add a Job Price</h2>
                <p className="text-white">
                  Quotes you create in Elec-Mate feed the benchmarks automatically. Add jobs you
                  priced elsewhere to make the data even stronger.
                </p>
              </div>

              <QuickSubmitForm onNavigateToInsights={() => setActiveTab('insights')} />
            </div>
          )}

          {/* Scrap Tab */}
          {activeTab === 'scrap' && (
            <div className="space-y-6 animate-fade-in">
              <MetalPricesGrid />

              <div className="pt-6 border-t border-white/10">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 mb-4">
                  Find scrap merchants
                </p>
                <CompactScrapMerchantFinder />
              </div>
            </div>
          )}

          {/* Insights Tab */}
          {activeTab === 'insights' && (
            <div className="animate-fade-in">
              <InsightsDashboard />
            </div>
          )}
        </main>
      </PricingErrorBoundary>
    </div>
  );
};

export default LivePricingHub;
