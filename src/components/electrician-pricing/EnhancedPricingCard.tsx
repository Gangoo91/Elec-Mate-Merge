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
  const formatPrice = (price: number | null | undefined): string => {
    if (price === null || price === undefined || isNaN(price)) {
      return 'Price TBC';
    }
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: pricingData.currency || 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateFallbackAverage = (): number | null => {
    if (pricingData.average_price && !isNaN(pricingData.average_price)) {
      return pricingData.average_price;
    }
    if (pricingData.min_price && pricingData.max_price && 
        !isNaN(pricingData.min_price) && !isNaN(pricingData.max_price)) {
      return Math.round((pricingData.min_price + pricingData.max_price) / 2);
    }
    return null;
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
    
    // Handle invalid dates
    if (isNaN(updated.getTime())) {
      return { text: 'Date unknown', color: 'secondary' };
    }
    
    const diffInDays = Math.floor((now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return { text: 'Today', color: 'default' };
    if (diffInDays === 1) return { text: 'Yesterday', color: 'default' };
    if (diffInDays <= 7) return { text: `${diffInDays}d ago`, color: 'default' };
    if (diffInDays <= 30) return { text: `${diffInDays}d ago`, color: 'secondary' };
    return { text: `${diffInDays}d ago`, color: 'destructive' };
  };

  // Calculate price position within range
  const fallbackAverage = calculateFallbackAverage();
  const priceRange = (pricingData.max_price || 0) - (pricingData.min_price || 0);
  const avgPosition = priceRange > 0 && fallbackAverage ? 
    ((fallbackAverage - (pricingData.min_price || 0)) / priceRange) * 100 : 50;

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
        <div className="bg-gradient-to-r from-primary/8 via-primary/5 to-primary/8 rounded-xl p-5 border border-primary/15 hover:border-primary/25 transition-all duration-300">
          <div className="text-center space-y-4">
            <div>
              <div className="mobile-small-text text-muted-foreground uppercase tracking-wider font-semibold mb-2">Average daily rate</div>
              <div className="text-3xl sm:text-4xl font-black text-primary mb-2 tracking-tight">
                {formatPrice(fallbackAverage)}
              </div>
              <div className="mobile-small-text text-muted-foreground">
                From {formatPrice(pricingData.min_price)} to {formatPrice(pricingData.max_price)} • {pricingData.unit}
              </div>
            </div>

            {/* Price Range Visualization */}
            {pricingData.min_price && pricingData.max_price && (
              <div className="space-y-3">
                <div className="flex justify-between mobile-small-text text-muted-foreground">
                  <span>Min: {formatPrice(pricingData.min_price)}</span>
                  <span>Max: {formatPrice(pricingData.max_price)}</span>
                </div>
                <div className="relative h-2 bg-muted/30 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 rounded-full"></div>
                  {fallbackAverage && (
                    <div 
                      className="absolute top-0 w-1 h-2 bg-primary rounded-full transform -translate-x-0.5 transition-all duration-700"
                      style={{ left: `${Math.min(Math.max(avgPosition, 0), 100)}%` }}
                    />
                  )}
                </div>
                {fallbackAverage && (
                  <div className="mobile-small-text text-primary/80 font-medium">
                    Average position in range
                  </div>
                )}
              </div>
            )}
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