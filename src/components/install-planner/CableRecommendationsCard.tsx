import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Cable, PoundSterling, Clock } from "lucide-react";
import { CableRecommendation } from "./types";

interface CableRecommendationsCardProps {
  recommendations: CableRecommendation[];
  onSelectCable?: (cable: CableRecommendation) => void;
  showNonCompliant?: boolean;
}

const CableRecommendationsCard = ({ recommendations, onSelectCable, showNonCompliant = false }: CableRecommendationsCardProps) => {
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
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Cable className="h-5 w-5 text-elec-yellow" />
          Cable Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 space-y-2">
        {recommendations.slice(0, 5).map((cable, index) => (
          <div
            key={`${cable.size}-${index}`}
            className={`p-3 rounded-lg border transition-all cursor-pointer hover:border-elec-yellow/50 ${
              index === 0 ? getSuitabilityColor(cable.suitability) : "border-gray-600 hover:border-gray-500"
            } ${index === 0 ? "ring-1 ring-elec-yellow/20" : ""}`}
            onClick={() => onSelectCable?.(cable)}
          >
            {/* Compact Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-elec-light">{cable.size}</span>
                {getSuitabilityIcon(cable.suitability)}
                {index === 0 && (
                  <Badge className={`text-xs px-2 py-0.5 ${
                    showNonCompliant || cable.suitability !== "suitable" 
                      ? "bg-red-500/20 text-red-300 border-red-500/30" 
                      : "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30"
                  }`}>
                    {showNonCompliant || cable.suitability !== "suitable" ? "NON-COMPLIANT" : "RECOMMENDED"}
                  </Badge>
                )}
              </div>
              <Badge 
                variant={cable.suitability === "suitable" ? "default" : "destructive"} 
                className="text-xs px-2 py-0.5"
              >
                {cable.suitability.toUpperCase()}
              </Badge>
            </div>

            {/* Compact Specs Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Capacity:</span>
                <span className="font-medium">{cable.currentCarryingCapacity}A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">V.Drop:</span>
                <span className={`font-medium ${
                  cable.voltageDropPercentage > 5 ? 'text-red-400' : 
                  cable.voltageDropPercentage > 3 ? 'text-amber-400' : 'text-green-400'
                }`}>
                  {cable.voltageDropPercentage.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cost:</span>
                <span className={`font-medium ${getCostColor(cable.cost || "medium")}`}>
                  {cable.cost?.toUpperCase() || "MEDIUM"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Install:</span>
                <span className={`font-medium ${
                  cable.installationComplexity === "simple" ? "text-green-400" :
                  cable.installationComplexity === "moderate" ? "text-amber-400" : "text-red-400"
                }`}>
                  {cable.installationComplexity?.toUpperCase() || "MODERATE"}
                </span>
              </div>
            </div>

            {/* Compact Notes */}
            {cable.notes.length > 0 && (
              <div className="mt-3 pt-2 border-t border-gray-700">
                <div className="space-y-1">
                  {cable.notes.slice(0, 2).map((note, noteIndex) => (
                    <div key={noteIndex} className="text-xs text-muted-foreground flex items-start gap-1">
                      <span className="text-elec-yellow mt-0.5 text-xs">•</span>
                      <span className="flex-1 leading-relaxed">{note}</span>
                    </div>
                  ))}
                  {cable.notes.length > 2 && (
                    <div className="text-xs text-muted-foreground/70 mt-1 text-center">
                      +{cable.notes.length - 2} more...
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CableRecommendationsCard;