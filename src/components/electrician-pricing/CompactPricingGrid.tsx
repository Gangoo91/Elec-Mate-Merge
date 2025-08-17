
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
}

const CompactPricingGrid = ({ metalPrices, lastUpdated }: CompactPricingGridProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Last Updated */}
      <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-gradient-to-r from-elec-yellow/5 to-elec-yellow/10 border border-elec-yellow/20">
        <Clock className="h-4 w-4 text-elec-yellow" />
        <p className="text-sm font-medium text-foreground">
          Last updated: <span className="text-elec-yellow">{lastUpdated}</span>
        </p>
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
