import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, TrendingUp, TrendingDown, AlertCircle, CheckCircle, MapPin, Calendar } from "lucide-react";

interface PricingData {
  id: string;
  region: string;
  county?: string;
  postcode?: string;
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
      case 'complex': return 'destructive';
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

  // Calculate price position within range
  const priceRange = pricingData.max_price - pricingData.min_price;
  const avgPosition = priceRange > 0 ? ((pricingData.average_price - pricingData.min_price) / priceRange) * 100 : 50;

  const freshness = getDataFreshness(pricingData.last_updated);

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 transition-all duration-300 hover:border-elec-yellow/40 hover:shadow-lg hover:shadow-elec-yellow/10 mobile-interactive">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-3">
          {/* Header with job type and badges */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
            <CardTitle className="mobile-subheading text-elec-yellow line-clamp-2">{pricingData.job_type}</CardTitle>
            <div className="flex gap-2 flex-wrap">
              <Badge variant={getComplexityColor(pricingData.complexity_level)} className="mobile-small-text">
                {pricingData.complexity_level}
              </Badge>
              {pricingData.confidence_score && (
                <Badge variant={getConfidenceColor(pricingData.confidence_score)} className="mobile-small-text">
                  {getConfidenceIcon(pricingData.confidence_score)}
                  {pricingData.confidence_score}%
                </Badge>
              )}
              {pricingData.is_approximate && (
                <Badge variant="outline" className="mobile-small-text">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Est.
                </Badge>
              )}
            </div>
          </div>
          
          {/* Enhanced Location Info */}
          <div className="flex items-center gap-2 mobile-small-text text-muted-foreground">
            <MapPin className="h-3 w-3 text-elec-yellow/70" />
            <span className="font-medium">{pricingData.region}</span>
            {pricingData.county && <span>• {pricingData.county}</span>}
            {pricingData.postcode && <span>• {pricingData.postcode}</span>}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        {/* Enhanced Price Display with Visual Bar */}
        <div className="bg-elec-yellow/10 rounded-lg p-4 border border-elec-yellow/20">
          <div className="text-center mb-3">
            <div className="mobile-small-text text-muted-foreground uppercase tracking-wide mb-1">From</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-elec-yellow mb-1">
              {formatPrice(pricingData.min_price)}
            </div>
            <div className="mobile-small-text text-muted-foreground">
              Avg: {formatPrice(pricingData.average_price)} • {pricingData.unit}
            </div>
          </div>

          {/* Price Range Visualization */}
          <div className="space-y-2">
            <div className="flex justify-between mobile-small-text text-muted-foreground">
              <span>Min: {formatPrice(pricingData.min_price)}</span>
              <span>Max: {formatPrice(pricingData.max_price)}</span>
            </div>
            <div className="relative">
              <Progress value={100} className="h-2 bg-elec-gray" />
              <div 
                className="absolute top-0 left-0 h-2 bg-elec-yellow rounded-full transition-all duration-500"
                style={{ width: `${Math.min(avgPosition, 100)}%` }}
              />
              <div 
                className="absolute top-0 w-1 h-2 bg-white rounded-full transform -translate-x-0.5"
                style={{ left: `${Math.min(avgPosition, 100)}%` }}
              />
            </div>
            <div className="text-center mobile-small-text text-elec-yellow/80">
              Average price position
            </div>
          </div>
        </div>

        {/* Job Category Badge */}
        {pricingData.job_category && (
          <div className="flex justify-center">
            <Badge variant="secondary" className="mobile-small-text">
              {pricingData.job_category}
            </Badge>
          </div>
        )}

        {/* Enhanced Data Quality Footer */}
        <div className="flex items-center justify-between mobile-small-text border-t border-elec-yellow/10 pt-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-elec-yellow/70" />
            <Badge variant={freshness.color as any} className="mobile-small-text px-2 py-0">
              {freshness.text}
            </Badge>
          </div>
          <div className="text-muted-foreground">
            {pricingData.data_source.replace('_', ' ')}
          </div>
        </div>

        {/* Confidence Score Bar */}
        {pricingData.confidence_score && (
          <div className="space-y-1">
            <div className="flex justify-between mobile-small-text">
              <span className="text-muted-foreground">Data confidence</span>
              <span className="text-elec-yellow">{pricingData.confidence_score}%</span>
            </div>
            <Progress 
              value={pricingData.confidence_score} 
              className="h-1.5"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedPricingCard;