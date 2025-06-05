
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Zap, Cable, Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PriceMetric {
  id: number;
  name: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
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

  const renderCompactMetrics = (metrics: PriceMetric[], limit: number = 3) => {
    const displayMetrics = expandedSection ? metrics : metrics.slice(0, limit);
    
    return (
      <div className="space-y-2">
        {displayMetrics.map((metric) => (
          <div key={metric.id} className="flex justify-between items-center text-sm">
            <span className="truncate flex-1 mr-2">{metric.name}</span>
            <div className="flex items-center gap-1 min-w-0">
              <span className="font-medium">{metric.value}</span>
              <span className={`flex items-center text-xs ${
                metric.trend === "up" 
                  ? "text-green-500" 
                  : metric.trend === "down"
                    ? "text-red-500"
                    : "text-gray-400"
              }`}>
                {metric.trend === "up" 
                  ? <TrendingUp className="h-3 w-3" /> 
                  : metric.trend === "down"
                    ? <TrendingDown className="h-3 w-3" />
                    : null
                }
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Last Updated Info */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
      </div>

      {/* Compact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Metal Prices */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-elec-yellow" />
              Metal Prices
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {renderCompactMetrics(metalPrices)}
            {metalPrices.length > 3 && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-3 text-xs"
                onClick={() => toggleSection('metals')}
              >
                {expandedSection === 'metals' ? 'Show Less' : `Show All (${metalPrices.length})`}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Cable Prices */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Cable className="h-5 w-5 text-elec-yellow" />
              Cable Prices
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {renderCompactMetrics(cablePrices)}
            {cablePrices.length > 3 && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-3 text-xs"
                onClick={() => toggleSection('cables')}
              >
                {expandedSection === 'cables' ? 'Show Less' : `Show All (${cablePrices.length})`}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Equipment Prices */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="h-5 w-5 text-elec-yellow" />
              Equipment Prices
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {renderCompactMetrics(equipmentPrices)}
            {equipmentPrices.length > 3 && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-3 text-xs"
                onClick={() => toggleSection('equipment')}
              >
                {expandedSection === 'equipment' ? 'Show Less' : `Show All (${equipmentPrices.length})`}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompactPricingGrid;
