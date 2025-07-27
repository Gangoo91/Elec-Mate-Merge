
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UltraFastPortfolioManager from "@/components/portfolio/UltraFastPortfolioManager";
import { queryClient } from '@/lib/queryClient';

const PortfolioBuildingTab = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UltraFastPortfolioManager />
    </QueryClientProvider>
  );
};

export default PortfolioBuildingTab;
