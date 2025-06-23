
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Award, TrendingUp } from "lucide-react";

interface BrandComparison {
  brand: string;
  model: string;
  price: string;
  rating: number;
  warranty: string;
  features: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
}

interface ToolComparisonChartProps {
  title: string;
  tools: BrandComparison[];
  category: string;
}

const ToolComparisonChart = ({ title, tools, category }: ToolComparisonChartProps) => {
  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-3 w-3 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-500'}`} 
      />
    ));
  };

  const getValueBadge = (index: number) => {
    if (index === 0) return { text: "Best Overall", color: "bg-green-500/20 text-green-400 border-green-500/30" };
    if (index === 1) return { text: "Best Value", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" };
    if (index === 2) return { text: "Budget Pick", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" };
    return null;
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-elec-yellow" />
          <CardTitle className="text-elec-yellow">{title}</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Professional comparison of top {category} tools for UK electricians
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {tools.map((tool, index) => {
            const badge = getValueBadge(index);
            return (
              <div key={index} className="border border-elec-yellow/30 rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-white">{tool.brand}</h4>
                    <p className="text-sm text-muted-foreground">{tool.model}</p>
                  </div>
                  {badge && (
                    <Badge className={badge.color} variant="outline">
                      {badge.text}
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Price:</span>
                    <span className="text-elec-yellow font-medium">{tool.price}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Rating:</span>
                    <div className="flex items-center gap-1">
                      {getRatingStars(tool.rating)}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Warranty:</span>
                    <span className="text-white">{tool.warranty}</span>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-white mb-1">Key Features:</h5>
                  <ul className="text-xs text-muted-foreground space-y-0.5">
                    {tool.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx}>• {feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-500/10 rounded p-2">
                  <span className="text-xs font-medium text-blue-300">Best For:</span>
                  <p className="text-xs text-blue-200 mt-1">{tool.bestFor}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolComparisonChart;
