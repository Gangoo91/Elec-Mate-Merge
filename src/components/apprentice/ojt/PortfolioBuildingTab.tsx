
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PortfolioManager from "@/components/portfolio/UltraFastPortfolioManager";
import { queryClient } from '@/lib/queryClient';
import LiveTrackingMetrics from './LiveTrackingMetrics';

const PortfolioBuildingTab = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="space-y-6">
        <LiveTrackingMetrics />
        <PortfolioManager />
      </div>
    </QueryClientProvider>
  );
};

export default PortfolioBuildingTab;
