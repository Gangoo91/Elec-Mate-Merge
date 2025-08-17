
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
  cablePrices: PriceMetric[];
  equipmentPrices: PriceMetric[];
  lastUpdated: string;
}

const CompactPricingGrid = ({ metalPrices, cablePrices, equipmentPrices, lastUpdated }: CompactPricingGridProps) => {
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

      {/* Enhanced Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PricingSection
          title="Metal Prices"
          icon={<Zap className="h-5 w-5 text-elec-yellow" />}
          prices={metalPrices}
          isExpanded={expandedSection === 'metals'}
          onToggle={() => toggleSection('metals')}
        />

        {cablePrices.length > 0 && (
          <PricingSection
            title="Cable Prices"
            icon={<Cable className="h-5 w-5 text-elec-yellow" />}
            prices={cablePrices}
            isExpanded={expandedSection === 'cables'}
            onToggle={() => toggleSection('cables')}
            showCompareButton={true}
            compareCategory="cable"
          />
        )}

        {equipmentPrices.length > 0 && (
          <PricingSection
            title="Equipment Prices"
            icon={<Settings className="h-5 w-5 text-elec-yellow" />}
            prices={equipmentPrices}
            isExpanded={expandedSection === 'equipment'}
            onToggle={() => toggleSection('equipment')}
            showCompareButton={true}
            compareCategory="equipment"
          />
        )}
      </div>
    </div>
  );
};

export default CompactPricingGrid;
