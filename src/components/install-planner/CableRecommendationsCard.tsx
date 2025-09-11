import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Cable, ChevronDown, ChevronUp } from "lucide-react";
import { CableRecommendation } from "./types";
import { useState } from "react";

interface CableRecommendationsCardProps {
  recommendations: CableRecommendation[];
  onSelectCable?: (cable: CableRecommendation) => void;
  showNonCompliant?: boolean;
}

const CableRecommendationsCard = ({ recommendations, onSelectCable, showNonCompliant = false }: CableRecommendationsCardProps) => {
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});
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
        return "text-white";
      case "high":
        return "text-red-400";
      default:
        return "text-white";
    }
  };

  const toggleExpanded = (index: number) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
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
            {/* Streamlined Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-lg font-bold text-white">{cable.size}</span>
                {getSuitabilityIcon(cable.suitability)}
                {index === 0 && (
                  <Badge className={`text-xs px-2 py-0.5 flex-shrink-0 ${
                    showNonCompliant || cable.suitability !== "suitable" 
                      ? "bg-red-500/20 text-red-300 border-red-500/30" 
                      : "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30"
                  }`}>
                    {showNonCompliant || cable.suitability !== "suitable" ? "NON-COMPLIANT" : "RECOMMENDED"}
                  </Badge>
                )}
              </div>
            </div>

            {/* Clean Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/80">Capacity:</span>
                <span className="font-medium text-white tabular-nums">{cable.currentCarryingCapacity}A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">V.Drop:</span>
                <span className={`font-medium tabular-nums ${
                  cable.voltageDropPercentage > 5 ? 'text-red-400' : 
                  cable.voltageDropPercentage > 3 ? 'text-amber-400' : 'text-green-400'
                }`}>
                  {cable.voltageDropPercentage.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Cost:</span>
                <span className={`font-medium ${getCostColor(cable.cost || "medium")}`}>
                  {cable.cost?.toUpperCase() || "MEDIUM"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Install:</span>
                <span className={`font-medium ${
                  cable.installationComplexity === "simple" ? "text-green-400" :
                  cable.installationComplexity === "moderate" ? "text-white" : "text-red-400"
                }`}>
                  {cable.installationComplexity?.toUpperCase() || "MODERATE"}
                </span>
              </div>
            </div>

            {/* Collapsible Notes */}
            {cable.notes.length > 0 && (
              <div className="mt-3 pt-2 border-t border-gray-700">
                <div className="space-y-1">
                  {/* Always show first note */}
                  {cable.notes.slice(0, 1).map((note, noteIndex) => (
                    <div key={noteIndex} className="text-xs text-white/80 flex items-start gap-1">
                      <span className="text-elec-yellow mt-0.5 text-xs flex-shrink-0">•</span>
                      <span className="flex-1 leading-relaxed">{note}</span>
                    </div>
                  ))}
                  
                  {/* Show additional notes if expanded or if only 2 total */}
                  {expandedCards[index] && cable.notes.slice(1).map((note, noteIndex) => (
                    <div key={noteIndex + 1} className="text-xs text-white/80 flex items-start gap-1">
                      <span className="text-elec-yellow mt-0.5 text-xs flex-shrink-0">•</span>
                      <span className="flex-1 leading-relaxed">{note}</span>
                    </div>
                  ))}
                  
                  {/* Toggle button for notes > 1 */}
                  {cable.notes.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpanded(index);
                      }}
                      className="text-xs text-elec-yellow hover:text-elec-yellow/80 flex items-center gap-1 mt-2"
                    >
                      {expandedCards[index] ? (
                        <>
                          <ChevronUp className="h-3 w-3" />
                          Show less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-3 w-3" />
                          Show {cable.notes.length - 1} more details
                        </>
                      )}
                    </button>
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