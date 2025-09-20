import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  MoreHorizontal, 
  Scale, 
  Calculator, 
  TrendingUp, 
  Brain, 
  Users,
  ChevronDown
} from "lucide-react";

interface MaterialsMoreToolsProps {
  selectedCount: number;
  onCompareClick: () => void;
  onBulkPricingClick: () => void;
  onPriceAlertsClick: () => void;
  onAIInsightsClick: () => void;
}

const MaterialsMoreTools = ({ 
  selectedCount, 
  onCompareClick, 
  onBulkPricingClick, 
  onPriceAlertsClick, 
  onAIInsightsClick 
}: MaterialsMoreToolsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const tools = [
    {
      id: "compare",
      title: "Compare Materials",
      description: "Side-by-side comparison",
      icon: Scale,
      onClick: onCompareClick,
      disabled: selectedCount === 0
    },
    {
      id: "bulk-pricing",
      title: "Bulk Pricing", 
      description: "Calculate bulk discounts",
      icon: Calculator,
      onClick: onBulkPricingClick,
      disabled: false
    },
    {
      id: "price-alerts",
      title: "Price Alerts",
      description: "Track price changes", 
      icon: TrendingUp,
      onClick: onPriceAlertsClick,
      disabled: false
    },
    {
      id: "ai-insights",
      title: "AI Insights",
      description: "Smart recommendations",
      icon: Brain,
      onClick: onAIInsightsClick,
      disabled: false
    }
  ];

  const handleToolClick = (toolId: string) => {
    const tool = tools.find(t => t.id === toolId);
    if (tool && !tool.disabled) {
      tool.onClick();
      setIsOpen(false);
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="relative border-elec-yellow/30 text-elec-light hover:bg-elec-yellow/10 hover:border-elec-yellow/50 data-[state=open]:bg-elec-yellow/10"
        >
          <MoreHorizontal className="h-4 w-4 mr-2" />
          More Tools
          <ChevronDown className={`h-4 w-4 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          {selectedCount > 0 && (
            <Badge 
              variant="secondary" 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-elec-yellow text-elec-dark border-elec-dark/20"
            >
              {selectedCount}
            </Badge>
          )}
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="relative">
        <Card className="fixed md:absolute top-2 left-0 right-0 md:top-full md:right-0 md:left-auto z-50 mt-2 w-full md:w-80 max-h-[80vh] overflow-y-auto backdrop-blur-sm bg-card/95 border-elec-yellow/20 shadow-lg">
          <CardContent className="p-0">
            <div className="py-2">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    onClick={() => handleToolClick(tool.id)}
                    disabled={tool.disabled}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${
                      tool.disabled
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-elec-yellow/10 text-elec-light active:bg-elec-yellow/20'
                    }`}
                  >
                    <Icon className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm truncate">{tool.title}</span>
                        {tool.id === "compare" && selectedCount > 0 && (
                          <Badge variant="secondary" className="bg-elec-yellow text-elec-dark text-xs">
                            {selectedCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{tool.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MaterialsMoreTools;