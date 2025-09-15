import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp } from "lucide-react";
import { MARKET_RATES_2025, calculateRegionalRate } from "@/lib/constants/pricing-2025";

interface RegionalRateSelectorProps {
  baseRate: number;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  onRateChange: (adjustedRate: number) => void;
}

export const RegionalRateSelector: React.FC<RegionalRateSelectorProps> = ({
  baseRate,
  selectedRegion,
  onRegionChange,
  onRateChange
}) => {
  const regionOptions = Object.entries(MARKET_RATES_2025.regionalMultipliers).map(([key, multiplier]) => ({
    value: key,
    label: `${key.charAt(0).toUpperCase() + key.slice(1)} (${multiplier > 1 ? '+' : ''}${((multiplier - 1) * 100).toFixed(0)}%)`,
  }));

  const handleRegionChange = (region: string) => {
    onRegionChange(region);
    const adjustedRate = calculateRegionalRate(baseRate, region as keyof typeof MARKET_RATES_2025.regionalMultipliers);
    onRateChange(adjustedRate);
  };

  const currentMultiplier = MARKET_RATES_2025.regionalMultipliers[selectedRegion as keyof typeof MARKET_RATES_2025.regionalMultipliers] || 1;
  const adjustedRate = calculateRegionalRate(baseRate, selectedRegion as keyof typeof MARKET_RATES_2025.regionalMultipliers);

  return (
    <Card className="border-elec-yellow/20 bg-elec-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-elec-light">
          <MapPin className="h-5 w-5 text-elec-yellow" />
          Regional Rate Adjustment (2025)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <MobileSelectWrapper
          label="Select Region"
          value={selectedRegion}
          onValueChange={handleRegionChange}
          options={regionOptions}
          hint="Rates adjusted for 2025 cost of living and market conditions"
        />
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Base Rate</div>
            <div className="text-lg font-semibold">£{baseRate.toFixed(2)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Regional Rate</div>
            <div className="text-lg font-semibold text-elec-yellow">£{adjustedRate.toFixed(2)}</div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <TrendingUp className="h-4 w-4 text-elec-yellow" />
          <Badge 
            variant={currentMultiplier > 1 ? "default" : "secondary"}
            className={currentMultiplier > 1 ? "bg-elec-yellow text-black" : ""}
          >
            {currentMultiplier > 1 ? '+' : ''}{((currentMultiplier - 1) * 100).toFixed(0)}% regional adjustment
          </Badge>
        </div>

        <div className="text-xs text-muted-foreground text-center">
          Regional rates updated for 2025 market conditions including inflation, living costs, and demand patterns.
        </div>
      </CardContent>
    </Card>
  );
};