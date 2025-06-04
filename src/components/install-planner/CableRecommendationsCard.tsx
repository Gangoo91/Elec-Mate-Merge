
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Cable, DollarSign, Clock } from "lucide-react";
import { CableRecommendation } from "./types";

interface CableRecommendationsCardProps {
  recommendations: CableRecommendation[];
  onSelectCable?: (cable: CableRecommendation) => void;
}

const CableRecommendationsCard = ({ recommendations, onSelectCable }: CableRecommendationsCardProps) => {
  const getSuitabilityIcon = (suitability: string) => {
    switch (suitability) {
      case "suitable":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "marginal":
        return <AlertTriangle className="h-5 w-5 text-amber-400" />;
      case "unsuitable":
        return <XCircle className="h-5 w-5 text-red-400" />;
      default:
        return null;
    }
  };

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case "suitable":
        return "bg-green-500/20 border-green-500/30 text-green-300";
      case "marginal":
        return "bg-amber-500/20 border-amber-500/30 text-amber-300";
      case "unsuitable":
        return "bg-red-500/20 border-red-500/30 text-red-300";
      default:
        return "";
    }
  };

  const getCostColor = (cost: string) => {
    switch (cost) {
      case "low":
        return "text-green-400";
      case "medium":
        return "text-amber-400";
      case "high":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cable className="h-5 w-5 text-elec-yellow" />
          Cable Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.slice(0, 5).map((cable, index) => (
          <div
            key={`${cable.size}-${index}`}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-elec-yellow/50 ${
              index === 0 ? getSuitabilityColor(cable.suitability) : "border-gray-600"
            } ${index === 0 ? "ring-2 ring-elec-yellow/30" : ""}`}
            onClick={() => onSelectCable?.(cable)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-xl font-bold">{cable.size}</div>
                {getSuitabilityIcon(cable.suitability)}
                {index === 0 && (
                  <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                    RECOMMENDED
                  </Badge>
                )}
              </div>
              <Badge variant={cable.suitability === "suitable" ? "default" : "destructive"}>
                {cable.suitability.toUpperCase()}
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
              <div>
                <div className="text-muted-foreground">Capacity</div>
                <div className="font-medium">{cable.currentCarryingCapacity}A</div>
              </div>
              <div>
                <div className="text-muted-foreground">Voltage Drop</div>
                <div className="font-medium">{cable.voltageDropPercentage.toFixed(2)}%</div>
              </div>
              <div>
                <div className="text-muted-foreground">Cost</div>
                <div className={`font-medium flex items-center gap-1 ${getCostColor(cable.cost || "medium")}`}>
                  <DollarSign className="h-3 w-3" />
                  {cable.cost?.toUpperCase() || "MEDIUM"}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Complexity</div>
                <div className={`font-medium flex items-center gap-1 ${
                  cable.installationComplexity === "simple" ? "text-green-400" :
                  cable.installationComplexity === "moderate" ? "text-amber-400" : "text-red-400"
                }`}>
                  <Clock className="h-3 w-3" />
                  {cable.installationComplexity?.toUpperCase() || "MODERATE"}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              {cable.notes.map((note, noteIndex) => (
                <div key={noteIndex} className="text-xs text-muted-foreground">
                  • {note}
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CableRecommendationsCard;
