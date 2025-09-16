
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, MapPin, Clock, Users } from "lucide-react";

interface AIInsights {
  averageRelevance: number;
  topCategories: string[];
  salaryRange: {
    min: number;
    max: number;
  };
  totalProcessed?: number;
  marketTrends?: string[];
  demandAreas?: string[];
}

interface AIJobInsightsProps {
  insights: AIInsights;
  isLoading: boolean;
}

const AIJobInsights: React.FC<AIJobInsightsProps> = ({ insights, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain className="h-5 w-5 text-elec-yellow animate-pulse" />
            AI Market Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-white/20 rounded w-3/4"></div>
            <div className="h-4 bg-white/20 rounded w-1/2"></div>
            <div className="h-4 bg-white/20 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatSalary = (amount: number) => {
    if (amount >= 1000) {
      return `£${(amount / 1000).toFixed(0)}k`;
    }
    return `£${amount.toLocaleString()}`;
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="h-5 w-5 text-elec-yellow" />
          AI Market Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-elec-yellow/10 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm font-medium">Avg. Match</span>
            </div>
            <div className={`text-xl font-bold ${getRelevanceColor(insights.averageRelevance)}`}>
              {insights.averageRelevance?.toFixed(0)}%
            </div>
          </div>
          
          <div className="text-center p-3 bg-elec-yellow/10 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm font-medium">Jobs Analyzed</span>
            </div>
            <div className="text-xl font-bold text-white">
              {insights.totalProcessed || 0}
            </div>
          </div>
          
          <div className="text-center p-3 bg-elec-yellow/10 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <MapPin className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm font-medium">Salary Range</span>
            </div>
            <div className="text-sm font-bold text-white">
              {insights.salaryRange?.min && insights.salaryRange?.max ? 
                `${formatSalary(insights.salaryRange.min)} - ${formatSalary(insights.salaryRange.max)}` :
                'N/A'
              }
            </div>
          </div>
        </div>

        {/* Top Categories */}
        {insights.topCategories && insights.topCategories.length > 0 && (
          <div>
            <h4 className="font-medium mb-2 flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Trending Skills & Categories
            </h4>
            <div className="flex flex-wrap gap-1">
              {insights.topCategories.map((category, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Market Trends */}
        {insights.marketTrends && insights.marketTrends.length > 0 && (
          <div>
            <h4 className="font-medium mb-2 text-white">Market Trends</h4>
            <ul className="text-sm text-white space-y-1">
              {insights.marketTrends.map((trend, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  {trend}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* High Demand Areas */}
        {insights.demandAreas && insights.demandAreas.length > 0 && (
          <div>
            <h4 className="font-medium mb-2 text-white">High Demand Areas</h4>
            <div className="flex flex-wrap gap-1">
              {insights.demandAreas.map((area, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIJobInsights;
