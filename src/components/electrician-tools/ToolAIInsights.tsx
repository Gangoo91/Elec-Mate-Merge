import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Package, Zap, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

import { type ToolItem } from "@/hooks/useToolsData";

interface AIRecommendation {
  type: 'alternative' | 'bundle' | 'upgrade' | 'accessory';
  title: string;
  description: string;
  reasoning: string;
  potentialSavings?: string;
}

interface ToolInsights {
  totalAnalyzed: number;
  categories: string[];
  averagePrice: number;
  topBrands: string[];
  priceRange: { min: number; max: number };
}

interface ToolAIInsightsProps {
  tools: ToolItem[];
  searchQuery: string;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'bundle': return Package;
    case 'upgrade': return TrendingUp;
    case 'accessory': return Zap;
    default: return Brain;
  }
};

const getTypeBadgeVariant = (type: string) => {
  switch (type) {
    case 'bundle': return 'default';
    case 'upgrade': return 'secondary';
    case 'accessory': return 'outline';
    default: return 'default';
  }
};

export const ToolAIInsights: React.FC<ToolAIInsightsProps> = ({ tools, searchQuery }) => {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [insights, setInsights] = useState<ToolInsights | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (tools.length > 0) {
      generateAIInsights();
    }
  }, [tools, searchQuery]);

  const generateAIInsights = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('ai-tool-recommendations', {
        body: { 
          searchQuery,
          tools: tools.slice(0, 25) // Limit to first 25 tools for analysis
        }
      });

      if (functionError) {
        throw functionError;
      }

      if (data.success) {
        setRecommendations(data.recommendations || []);
        setInsights(data.insights);
      } else {
        throw new Error(data.error || 'Failed to generate AI insights');
      }
    } catch (err) {
      console.error('Error generating AI insights:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate AI insights');
      toast({
        title: "AI Analysis Failed",
        description: "Unable to generate tool insights. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (tools.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Brain className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Tools to Analyze</h3>
          <p className="text-muted-foreground text-center">
            Search for tools or select a category to get AI-powered insights and recommendations.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <h3 className="text-lg font-medium mb-2">Analyzing Tools</h3>
          <p className="text-muted-foreground text-center">
            AI is reviewing {tools.length} tools to provide personalized recommendations...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <h3 className="text-lg font-medium mb-2">Analysis Failed</h3>
          <p className="text-muted-foreground text-center mb-4">{error}</p>
          <Button onClick={generateAIInsights} variant="outline">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Analysis Overview */}
      {insights && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Analysis Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{insights.totalAnalyzed}</div>
                <div className="text-sm text-muted-foreground">Tools Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">£{insights.averagePrice}</div>
                <div className="text-sm text-muted-foreground">Average Price</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{insights.categories.length}</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{insights.topBrands.length}</div>
                <div className="text-sm text-muted-foreground">Brands</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Recommendations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">AI Recommendations</h3>
          <Button onClick={generateAIInsights} variant="outline" size="sm">
            <Brain className="h-4 w-4 mr-2" />
            Refresh Analysis
          </Button>
        </div>

        {recommendations.length > 0 ? (
          <div className="grid gap-4">
            {recommendations.map((recommendation, index) => {
              const Icon = getTypeIcon(recommendation.type);
              return (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-primary" />
                        <CardTitle className="text-base">{recommendation.title}</CardTitle>
                      </div>
                      <Badge variant={getTypeBadgeVariant(recommendation.type)}>
                        {recommendation.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground mb-3">{recommendation.description}</p>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm text-foreground">
                        <strong>Why this matters:</strong> {recommendation.reasoning}
                      </p>
                      {recommendation.potentialSavings && (
                        <p className="text-sm text-green-600 font-medium mt-2">
                          💰 {recommendation.potentialSavings}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <Brain className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Recommendations Generated</h3>
              <p className="text-muted-foreground text-center">
                The AI couldn't generate specific recommendations for these tools. 
                Try refining your search or selecting different tools.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};