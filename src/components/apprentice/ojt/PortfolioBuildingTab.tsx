import PortfolioManager from "@/components/portfolio/UltraFastPortfolioManager";
import LiveTrackingMetrics from './LiveTrackingMetrics';

const PortfolioBuildingTab = () => {
  return (
    <div className="space-y-6">
      <LiveTrackingMetrics />
      <PortfolioManager />
    </div>
  );
};

export default PortfolioBuildingTab;
