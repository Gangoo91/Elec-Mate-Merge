
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
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cable className="h-5 w-5 text-elec-yellow" />
          Cable Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.slice(0, 5).map((cable, index) => (
          <div
            key={`${cable.size}-${index}`}
            className={`p-4 rounded-lg border transition-all hover:border-elec-yellow/50 ${
              index === 0 ? getSuitabilityColor(cable.suitability) : "border-gray-600 hover:border-gray-500"
            } ${index === 0 ? "ring-1 ring-elec-yellow/20" : ""}`}
            onClick={() => onSelectCable?.(cable)}
          >
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="text-xl font-bold text-elec-light">{cable.size}</div>
                {getSuitabilityIcon(cable.suitability)}
                {index === 0 && (
                  <Badge className={`text-xs px-2 py-1 ${
                    showNonCompliant || cable.suitability !== "suitable" 
                      ? "bg-red-500/20 text-red-300 border-red-500/30" 
                      : "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30"
                  }`}>
                    {showNonCompliant || cable.suitability !== "suitable" ? "NON-COMPLIANT" : "RECOMMENDED"}
                  </Badge>
                )}
              </div>
              <Badge variant={cable.suitability === "suitable" ? "default" : "destructive"} className="self-start sm:self-center">
                {cable.suitability.toUpperCase()}
              </Badge>
            </div>

            {/* Technical Specifications - 2 Column Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Capacity</span>
                  <span className="font-semibold text-sm">{cable.currentCarryingCapacity}A</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Voltage Drop</span>
                  <span className="font-semibold text-sm">{cable.voltageDropPercentage.toFixed(2)}%</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Cost</span>
                  <div className={`flex items-center gap-1 font-semibold text-sm ${getCostColor(cable.cost || "medium")}`}>
                    <PoundSterling className="h-3 w-3" />
                    <span>{cable.cost?.toUpperCase() || "MEDIUM"}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Install</span>
                  <div className={`flex items-center gap-1 font-semibold text-sm ${
                    cable.installationComplexity === "simple" ? "text-green-400" :
                    cable.installationComplexity === "moderate" ? "text-amber-400" : "text-red-400"
                  }`}>
                    <Clock className="h-3 w-3" />
                    <span>{cable.installationComplexity?.toUpperCase() || "MODERATE"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes Section */}
            {cable.notes.length > 0 && (
              <div className="pt-3 border-t border-gray-700">
                <div className="space-y-1">
                  {cable.notes.slice(0, 3).map((note, noteIndex) => (
                    <div key={noteIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-elec-yellow mt-0.5">•</span>
                      <span className="flex-1">{note}</span>
                    </div>
                  ))}
                  {cable.notes.length > 3 && (
                    <div className="text-xs text-muted-foreground/70 mt-2">
                      +{cable.notes.length - 3} more considerations...
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
