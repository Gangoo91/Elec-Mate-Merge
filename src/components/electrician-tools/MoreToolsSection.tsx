import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Scale, Calculator, TrendingUp, Brain, MoreHorizontal } from "lucide-react";
import { ToolItem } from "@/hooks/useToolsData";
import AIEnhancedToolPriceComparison from "./AIEnhancedToolPriceComparison";
import BulkToolPricingCalculator from "./BulkToolPricingCalculator";
import ToolPriceHistoryAlerts from "./ToolPriceHistoryAlerts";
import { ToolAIInsights } from "./ToolAIInsights";

interface MoreToolsSectionProps {
  selectedItems: ToolItem[];
  onRemoveFromCompare: (itemId: string) => void;
  onClearComparison: () => void;
  categoryName: string;
  tools?: ToolItem[];
}

const MoreToolsSection = ({ 
  selectedItems, 
  onRemoveFromCompare, 
  onClearComparison, 
  categoryName,
  tools = []
}: MoreToolsSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const features = [
    { id: "compare", label: "Compare Tools", icon: Scale, description: "Compare up to 3 tools side by side" },
    { id: "bulk", label: "Bulk Pricing", icon: Calculator, description: "Calculate bulk order pricing" },
    { id: "alerts", label: "Price Alerts", icon: TrendingUp, description: "Set up price drop notifications" },
    { id: "ai", label: "AI Insights", icon: Brain, description: "Get AI-powered tool recommendations" },
  ];

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case "compare":
        return (
          <AIEnhancedToolPriceComparison
            selectedItems={selectedItems}
            onClearSelection={onClearComparison}
          />
        );
      case "bulk":
        return <BulkToolPricingCalculator categoryName={categoryName} />;
      case "alerts":
        return <ToolPriceHistoryAlerts categoryName={categoryName} />;
      case "ai":
        return <ToolAIInsights tools={tools} searchQuery={categoryName} />;
      default:
        return null;
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-card/30">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full justify-between p-4 h-auto hover:bg-elec-yellow/5"
          >
            <div className="flex items-center gap-2">
              <MoreHorizontal className="h-5 w-5 text-elec-yellow" />
              <span className="font-medium">More Tools & Features</span>
            </div>
            <ChevronDown className="h-5 w-5 text-elec-yellow transition-transform duration-200 data-[state=open]:rotate-180" />
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            {/* Feature Selection */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                const isActive = activeFeature === feature.id;
                
                return (
                  <Button
                    key={feature.id}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveFeature(isActive ? null : feature.id)}
                    className={`flex flex-col items-center gap-1 h-auto p-3 ${
                      isActive 
                        ? "bg-elec-yellow text-elec-dark" 
                        : "border-elec-yellow/30 hover:bg-elec-yellow/10"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs text-center">{feature.label}</span>
                  </Button>
                );
              })}
            </div>

            {/* Feature Descriptions */}
            {!activeFeature && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-muted-foreground">
                {features.map((feature) => (
                  <div key={feature.id} className="text-center">
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Active Feature Content */}
            {activeFeature && (
              <div className="mt-4 p-4 bg-elec-gray/30 rounded-lg border border-elec-yellow/10">
                {renderFeatureContent()}
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default MoreToolsSection;