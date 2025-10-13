import { Badge } from "@/components/ui/badge";
import { CheckCircle, Info, AlertCircle } from "lucide-react";

interface ConfidenceBadgeProps {
  confidence: number; // 0-1
  className?: string;
}

export const ConfidenceBadge = ({ confidence, className = "" }: ConfidenceBadgeProps) => {
  const percentage = Math.round(confidence * 100);
  
  const getVariant = () => {
    if (confidence > 0.85) return "default"; // high - green/yellow
    if (confidence > 0.7) return "secondary"; // medium - blue
    return "outline"; // low - gray
  };
  
  const getIcon = () => {
    if (confidence > 0.85) return <CheckCircle className="h-3 w-3" />;
    if (confidence > 0.7) return <Info className="h-3 w-3" />;
    return <AlertCircle className="h-3 w-3" />;
  };
  
  const getColor = () => {
    if (confidence > 0.85) return "text-green-500";
    if (confidence > 0.7) return "text-blue-400";
    return "text-gray-400";
  };
  
  return (
    <Badge variant={getVariant()} className={`gap-1 ${getColor()} ${className}`}>
      {getIcon()}
      <span>{percentage}%</span>
    </Badge>
  );
};
