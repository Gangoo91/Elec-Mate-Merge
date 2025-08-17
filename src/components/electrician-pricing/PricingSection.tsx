import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import PriceItem from "./PriceItem";

interface PriceMetric {
  id: number;
  name: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

interface PricingSectionProps {
  title: string;
  icon: React.ReactNode;
  prices: PriceMetric[];
  isExpanded: boolean;
  onToggle: () => void;
  limit?: number;
}

const PricingSection = ({ 
  title, 
  icon, 
  prices, 
  isExpanded, 
  onToggle, 
  limit = 3 
}: PricingSectionProps) => {
  const displayPrices = isExpanded ? prices : prices.slice(0, limit);
  const hasMore = prices.length > limit;

  return (
    <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-gray to-elec-gray/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-elec-yellow/10">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-3 text-foreground">
          <div className="p-2 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
            {icon}
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {displayPrices.map((price, index) => (
          <PriceItem
            key={price.id}
            name={price.name}
            value={price.value}
            change={price.change}
            trend={price.trend}
            isLarge={index === 0 && !isExpanded} // Make first item larger when collapsed
          />
        ))}
        
        {hasMore && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-4 text-sm font-medium text-elec-yellow hover:text-elec-yellow hover:bg-elec-yellow/10 transition-colors"
            onClick={onToggle}
          >
            <div className="flex items-center gap-2">
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              {isExpanded ? 'Show Less' : `Show All (${prices.length})`}
            </div>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PricingSection;