import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Star,
  Lightbulb,
  CheckCircle,
  Sparkles,
  Cable,
  Shield,
  Zap,
} from "lucide-react";
import { MaterialItem } from "@/hooks/useToolsForMaterials";

interface InlineMaterialAIInsightsSectionProps {
  materials: MaterialItem[];
  categoryName: string;
}

const InlineMaterialAIInsightsSection = ({
  materials,
  categoryName,
}: InlineMaterialAIInsightsSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Generate insights based on materials data
  const insights = useMemo(() => {
    if (!materials || materials.length === 0) {
      return {
        bestValue: null,
        topRated: null,
        bestDeal: null,
        recommendations: [],
        tips: [],
      };
    }

    // Find best deal (highest discount)
    const onSaleMaterials = materials.filter((m) => m.isOnSale && m.salePrice);
    const bestDeal = onSaleMaterials.length > 0 ? onSaleMaterials[0] : null;

    // Find best value (lowest price)
    const sortedByPrice = [...materials].sort((a, b) => {
      const priceA = parseFloat((a.salePrice || a.price || "0").replace(/[£,]/g, ""));
      const priceB = parseFloat((b.salePrice || b.price || "0").replace(/[£,]/g, ""));
      return priceA - priceB;
    });
    const bestValue = sortedByPrice[0] || null;

    // Generate category-specific tips
    const tips = getCategoryTips(categoryName);

    // Generate recommendations
    const recommendations = [
      bestDeal && `Save on ${bestDeal.name.split(" ").slice(0, 3).join(" ")} - currently on sale`,
      materials.length > 10 && `${materials.length} options available - use filters to narrow down`,
      onSaleMaterials.length > 0 && `${onSaleMaterials.length} items on sale in this category`,
    ].filter(Boolean);

    return { bestValue, topRated: null, bestDeal, recommendations, tips };
  }, [materials, categoryName]);

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 rounded-xl
                   bg-gradient-to-r from-purple-500/10 to-indigo-500/5
                   border border-purple-500/20 hover:border-purple-500/40
                   transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/20">
            <Brain className="h-5 w-5 text-purple-400" />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              AI Insights
              <Sparkles className="h-4 w-4 text-purple-400" />
            </h2>
            <p className="text-sm text-muted-foreground">
              Smart recommendations for {categoryName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-purple-500/10 text-purple-400 border-purple-500/30"
          >
            {insights.recommendations.length + insights.tips.length} insights
          </Badge>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors" />
          )}
        </div>
      </button>

      {/* Collapsed Preview */}
      {!isExpanded && insights.recommendations.length > 0 && (
        <div className="flex flex-wrap gap-2 px-2">
          {insights.recommendations.slice(0, 2).map((rec, i) => (
            <Badge
              key={i}
              variant="outline"
              className="bg-white/5 border-white/10 text-xs text-muted-foreground"
            >
              <Lightbulb className="h-3 w-3 mr-1 text-primary" />
              {rec}
            </Badge>
          ))}
        </div>
      )}

      {/* Expanded Content */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Recommendations */}
          <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Recommendations
            </h3>
            <div className="space-y-2">
              {insights.recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </div>
              ))}
              {insights.recommendations.length === 0 && (
                <p className="text-sm text-muted-foreground italic">
                  Browse more materials to get personalized recommendations
                </p>
              )}
            </div>
          </div>

          {/* Category Tips */}
          <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-400" />
              Pro Tips
            </h3>
            <div className="space-y-2">
              {insights.tips.map((tip, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Star className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Best Deal Highlight */}
          {insights.bestDeal && (
            <div className="md:col-span-2 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    Best Deal Available
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {insights.bestDeal.name.slice(0, 50)}... -{" "}
                    <span className="text-green-500 font-semibold">
                      {insights.bestDeal.salePrice}
                    </span>
                    <span className="text-muted-foreground line-through ml-2">
                      {insights.bestDeal.price}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

// Category-specific tips
const getCategoryTips = (category: string): string[] => {
  const tips: Record<string, string[]> = {
    "Cables & Wiring": [
      "Use 2.5mm² for ring mains, 1.5mm² for lighting",
      "Check voltage drop calculations for longer runs",
      "SWA cable required for external/underground installation",
    ],
    cables: [
      "Use 2.5mm² for ring mains, 1.5mm² for lighting",
      "Check voltage drop calculations for longer runs",
      "SWA cable required for external/underground installation",
    ],
    "Electrical Components": [
      "RCBO provides individual circuit protection",
      "Check discrimination between protective devices",
      "Consider surge protection for sensitive equipment",
    ],
    components: [
      "RCBO provides individual circuit protection",
      "Check discrimination between protective devices",
      "Consider surge protection for sensitive equipment",
    ],
    "Protection Equipment": [
      "30mA RCD for socket outlets",
      "Type A RCD for electronic equipment",
      "Check earth electrode resistance annually",
    ],
    protection: [
      "30mA RCD for socket outlets",
      "Type A RCD for electronic equipment",
      "Check earth electrode resistance annually",
    ],
    "Lighting Solutions": [
      "Check LED driver compatibility with dimmers",
      "Emergency lighting requires 3-hour battery backup",
      "IP65 minimum for outdoor lighting",
    ],
    lighting: [
      "Check LED driver compatibility with dimmers",
      "Emergency lighting requires 3-hour battery backup",
      "IP65 minimum for outdoor lighting",
    ],
    "Cable Management & Conduit": [
      "45% cable fill for conduit",
      "Fire barriers required at compartment walls",
      "Steel conduit provides mechanical protection",
    ],
    "cable-management": [
      "45% cable fill for conduit",
      "Fire barriers required at compartment walls",
      "Steel conduit provides mechanical protection",
    ],
    "Smart Home & Controls": [
      "Check neutral wire requirement for smart switches",
      "Consider hub compatibility before purchase",
      "Mesh systems improve reliability",
    ],
    "smart-controls": [
      "Check neutral wire requirement for smart switches",
      "Consider hub compatibility before purchase",
      "Mesh systems improve reliability",
    ],
    "EV Charging": [
      "Minimum 32A supply for 7kW charger",
      "PME earthing may require earth rod",
      "Consider load management for multiple chargers",
    ],
    "ev-charging": [
      "Minimum 32A supply for 7kW charger",
      "PME earthing may require earth rod",
      "Consider load management for multiple chargers",
    ],
  };

  return tips[category] || [
    "Buy quality - it lasts longer",
    "Check BS7671 compliance",
    "Consider warranty and support",
  ];
};

export default InlineMaterialAIInsightsSection;
