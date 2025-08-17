
import { Zap, Cable, Settings, Clock } from "lucide-react";
import { useState } from "react";
import PricingSection from "./PricingSection";

interface PriceMetric {
  id: number;
  name: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  badge?: string;
  suppliers?: string[];
  subItems?: PriceMetric[];
}

interface CompactPricingGridProps {
  metalPrices: PriceMetric[];
  lastUpdated: string;
  isLive?: boolean;
  dataSource?: string;
}

const CompactPricingGrid = ({ metalPrices, lastUpdated, isLive, dataSource }: CompactPricingGridProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Last Updated and Live Status */}
      <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-gradient-to-r from-elec-yellow/5 to-elec-yellow/10 border border-elec-yellow/20">
        <Clock className="h-4 w-4 text-elec-yellow" />
        <p className="text-sm font-medium text-foreground">
          Last updated: <span className="text-elec-yellow">{lastUpdated}</span>
        </p>
        {isLive && (
          <div className="flex items-center gap-1 ml-3 px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-green-400">LIVE</span>
          </div>
        )}
        {!isLive && dataSource && (
          <div className="flex items-center gap-1 ml-3 px-2 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full">
            <span className="text-xs font-medium text-orange-400">
              {dataSource === 'mock_realistic' ? 'CACHED' : 'FALLBACK'}
            </span>
          </div>
        )}
      </div>

      {/* Enhanced Grid Layout - Metal Prices Only */}
      <div className="grid grid-cols-1">
        <PricingSection
          title="Metal Prices"
          icon={<Zap className="h-5 w-5 text-elec-yellow" />}
          prices={metalPrices}
          isExpanded={expandedSection === 'metals'}
          onToggle={() => toggleSection('metals')}
        />
      </div>
    </div>
  );
};

export default CompactPricingGrid;
