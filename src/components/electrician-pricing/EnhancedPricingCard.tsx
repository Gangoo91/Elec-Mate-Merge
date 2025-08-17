import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from "lucide-react";

interface PricingData {
  id: string;
  region: string;
  county?: string;
  job_type: string;
  job_category: string;
  min_price: number;
  max_price: number;
  average_price: number;
  complexity_level: string;
  data_source: string;
  confidence_score?: number;
  last_updated: string;
  currency: string;
  unit: string;
  is_approximate?: boolean;
}

interface EnhancedPricingCardProps {
  pricingData: PricingData;
}

const EnhancedPricingCard = ({ pricingData }: EnhancedPricingCardProps) => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: pricingData.currency || 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity.toLowerCase()) {
      case 'simple': return 'success';
      case 'standard': return 'default';
      case 'complex': return 'warning';
      default: return 'outline';
    }
  };

  const getConfidenceColor = (score?: number) => {
    if (!score) return 'outline';
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'destructive';
  };

  const getConfidenceIcon = (score?: number) => {
    if (!score) return <AlertCircle className="h-3 w-3" />;
    if (score >= 80) return <CheckCircle className="h-3 w-3" />;
    if (score >= 60) return <TrendingUp className="h-3 w-3" />;
    return <TrendingDown className="h-3 w-3" />;
  };

  const getDataFreshness = (lastUpdated: string) => {
    const now = new Date();
    const updated = new Date(lastUpdated);
    const diffInDays = Math.floor((now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return { text: 'Today', color: 'success' };
    if (diffInDays === 1) return { text: 'Yesterday', color: 'success' };
    if (diffInDays <= 7) return { text: `${diffInDays} days ago`, color: 'default' };
    if (diffInDays <= 30) return { text: `${diffInDays} days ago`, color: 'warning' };
    return { text: `${diffInDays} days ago`, color: 'destructive' };
  };

  const freshness = getDataFreshness(pricingData.last_updated);

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg text-elec-yellow">{pricingData.job_type}</CardTitle>
          {pricingData.is_approximate && (
            <Badge variant="outline" className="text-xs">
              <AlertCircle className="h-3 w-3 mr-1" />
              Estimated
            </Badge>
          )}
        </div>
        <div className="flex gap-2 mt-2">
          <Badge variant={getComplexityColor(pricingData.complexity_level)} className="text-xs">
            {pricingData.complexity_level}
          </Badge>
          {pricingData.confidence_score && (
            <Badge variant={getConfidenceColor(pricingData.confidence_score)} className="text-xs">
              {getConfidenceIcon(pricingData.confidence_score)}
              {pricingData.confidence_score}% confidence
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Location Info */}
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">{pricingData.region}</span>
          {pricingData.county && <span>, {pricingData.county}</span>}
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Price Range:</span>
            <span className="font-semibold">
              {formatPrice(pricingData.min_price)} - {formatPrice(pricingData.max_price)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Average:</span>
            <span className="font-bold text-elec-yellow text-lg">
              {formatPrice(pricingData.average_price)}
            </span>
          </div>
          <div className="text-xs text-muted-foreground text-right">
            {pricingData.unit}
          </div>
        </div>

        {/* Data Quality Indicators */}
        <div className="pt-3 border-t border-elec-yellow/10">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <Badge variant={freshness.color as any} className="text-xs px-2 py-0">
                {freshness.text}
              </Badge>
            </div>
            <div className="text-muted-foreground">
              Source: {pricingData.data_source.replace('_', ' ')}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedPricingCard;