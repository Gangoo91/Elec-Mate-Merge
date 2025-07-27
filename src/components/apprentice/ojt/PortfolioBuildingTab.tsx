
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PortfolioManager from "@/components/portfolio/UltraFastPortfolioManager";
import { queryClient } from '@/lib/queryClient';

const PortfolioBuildingTab = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PortfolioManager />
    </QueryClientProvider>
  );
};

export default PortfolioBuildingTab;
