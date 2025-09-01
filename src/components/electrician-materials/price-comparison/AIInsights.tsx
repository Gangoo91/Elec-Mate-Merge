import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Lightbulb, Package, AlertTriangle, Star, Loader2 } from "lucide-react";
import { PriceComparisonItem } from "./ProductCard";

export interface AIRecommendation {
  type: 'alternative' | 'bundle' | 'upgrade' | 'warning';
  title: string;
  description: string;
  savings?: number;
  confidence: number;
  products?: PriceComparisonItem[];
}

export interface AIInsights {
  smartMatching: {
    matchedGroups: PriceComparisonItem[][];
    alternatives: PriceComparisonItem[];
    recommendations: AIRecommendation[];
  };
  valueAnalysis: {
    recommendations: AIRecommendation[];
    insights: string[];
  };
  purchaseRecommendations: AIRecommendation[];
  summary: {
    totalProducts: number;
    matchedGroups: number;
    alternatives: number;
    recommendations: number;
  };
}

interface AIInsightsProps {
  aiInsights: AIInsights;
  isAiAnalyzing: boolean;
  onAddToQuote?: (material: any, quantity?: number) => void;
  onAddMultipleToQuote?: (materials: any[]) => void;
}

export const AIInsightsComponent = ({ 
  aiInsights, 
  isAiAnalyzing, 
  onAddToQuote, 
  onAddMultipleToQuote 
}: AIInsightsProps) => {
  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'alternative': return Lightbulb;
      case 'bundle': return Package;
      case 'upgrade': return Star;
      case 'warning': return AlertTriangle;
      default: return Brain;
    }
  };

  const getRecommendationColor = (type: string) => {
    switch (type) {
      case 'alternative': return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
      case 'bundle': return 'text-purple-400 border-purple-500/30 bg-purple-500/10';
      case 'upgrade': return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
      case 'warning': return 'text-red-400 border-red-500/30 bg-red-500/10';
      default: return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
    }
  };

  if (isAiAnalyzing) {
    return (
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-blue-400">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">AI is analyzing products and generating recommendations...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!aiInsights) return null;

  return (
    <div className="space-y-4">
      {/* AI Summary */}
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-blue-300 text-lg flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{aiInsights.summary.totalProducts}</div>
              <div className="text-xs text-muted-foreground">Products Analysed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{aiInsights.summary.matchedGroups}</div>
              <div className="text-xs text-muted-foreground">Similar Groups</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">{aiInsights.summary.alternatives}</div>
              <div className="text-xs text-muted-foreground">Alternatives</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{aiInsights.summary.recommendations}</div>
              <div className="text-xs text-muted-foreground">Recommendations</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Recommendations */}
      {aiInsights.smartMatching.recommendations.length > 0 && (
        <Card className="border-purple-500/30 bg-purple-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-300 text-lg flex items-center gap-2">
              <Package className="h-5 w-5" />
              Smart Product Matching
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiInsights.smartMatching.recommendations.slice(0, 3).map((rec, idx) => {
                const Icon = getRecommendationIcon(rec.type);
                return (
                  <div key={idx} className={`p-3 rounded-lg border ${getRecommendationColor(rec.type)}`}>
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{rec.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {rec.confidence}% confidence
                          </Badge>
                          {rec.savings && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                              Save £{rec.savings}
                            </Badge>
                          )}
                        </div>
                      </div>
                      {rec.products && rec.products.length > 0 && onAddMultipleToQuote && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onAddMultipleToQuote(rec.products!)}
                          className="text-xs"
                        >
                          Add Bundle
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Value Analysis Insights */}
      {aiInsights.valueAnalysis.insights.length > 0 && (
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-amber-300 text-lg flex items-center gap-2">
              <Star className="h-5 w-5" />
              Value Analysis Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {aiInsights.valueAnalysis.insights.slice(0, 3).map((insight, idx) => (
                <p key={idx} className="text-sm text-amber-200 flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  {insight}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Purchase Recommendations */}
      {aiInsights.purchaseRecommendations.length > 0 && (
        <Card className="border-green-500/30 bg-green-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-300 text-lg flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Purchase Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiInsights.purchaseRecommendations.slice(0, 2).map((rec, idx) => {
                const Icon = getRecommendationIcon(rec.type);
                return (
                  <div key={idx} className="p-3 rounded-lg border border-green-500/20 bg-green-500/5">
                    <div className="flex items-start gap-3">
                      <Icon className="h-4 w-4 mt-1 text-green-400 flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-green-300">{rec.title}</h4>
                        <p className="text-xs text-green-200/80 mt-1">{rec.description}</p>
                        {rec.savings && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs mt-2">
                            Potential savings: £{rec.savings}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};