import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Star } from "lucide-react";

interface JobComplexityCardProps {
  complexity: any;
}

const JobComplexityCard = ({ complexity }: JobComplexityCardProps) => {
  const getComplexityColor = (rating: number) => {
    if (rating <= 2) return "text-green-500";
    if (rating <= 3) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <Card className="border-0 sm:border border-elec-yellow/20 rounded-none sm:rounded-xl">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl sm:text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Job Complexity
          </CardTitle>
          <Badge className={`${
            complexity.rating <= 2 
              ? 'bg-green-500/20 text-green-500 border-green-500/30' 
              : complexity.rating <= 3 
              ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' 
              : 'bg-red-500/20 text-red-500 border-red-500/30'
          }`}>
            {complexity.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6 space-y-4">
        {/* Rating */}
        <div className="flex items-center gap-3">
          <div className={`text-4xl font-bold ${getComplexityColor(complexity.rating)}`}>
            {complexity.rating}/5
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= complexity.rating 
                    ? `fill-current ${getComplexityColor(complexity.rating)}` 
                    : 'text-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Explanation */}
        {complexity.explanation && (
          <p className="text-base sm:text-sm text-white/90 leading-relaxed">
            {complexity.explanation}
          </p>
        )}

        {/* Factors */}
        {complexity.factors && complexity.factors.length > 0 && (
          <div>
            <div className="text-base sm:text-sm font-medium text-white mb-2">Contributing Factors:</div>
            <ul className="space-y-1">
              {complexity.factors.map((factor: string, idx: number) => (
                <li key={idx} className="text-base sm:text-sm text-white/90 flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommended Margin */}
        {complexity.recommendedMargin && (
          <div className="p-4 sm:p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
            <div className="text-sm text-white/80">Recommended Margin</div>
            <div className="text-xl sm:text-lg font-bold text-elec-yellow">
              {complexity.recommendedMargin}%
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobComplexityCard;
