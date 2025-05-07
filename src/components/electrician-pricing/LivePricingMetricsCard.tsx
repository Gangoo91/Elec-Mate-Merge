
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PriceMetric {
  id: number;
  name: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

interface LivePricingMetricsCardProps {
  title: string;
  metrics: PriceMetric[];
}

const LivePricingMetricsCard = ({ title, metrics }: LivePricingMetricsCardProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric) => (
            <div key={metric.id} className="flex justify-between items-center border-b border-elec-yellow/10 pb-2">
              <span className="text-sm">{metric.name}</span>
              <div className="flex items-center">
                <span className="font-medium w-16 text-right">{metric.value}</span>
                <span className={`flex items-center text-xs px-1 py-0.5 rounded w-14 justify-end ${
                  metric.trend === "up" 
                    ? "text-green-500" 
                    : metric.trend === "down"
                      ? "text-red-500"
                      : "text-gray-400"
                }`}>
                  {metric.trend === "up" 
                    ? <TrendingUp className="h-3 w-3 mr-0.5" /> 
                    : metric.trend === "down"
                      ? <TrendingDown className="h-3 w-3 mr-0.5" />
                      : null
                  }
                  {metric.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LivePricingMetricsCard;
