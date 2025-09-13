import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const tools = [
    {
      icon: Scale,
      label: "Compare Materials",
      description: "Side-by-side comparison",
      onClick: onCompareClick,
      disabled: selectedCount === 0,
      badge: selectedCount > 0 ? selectedCount : undefined
    },
    {
      icon: Calculator,
      label: "Bulk Pricing",
      description: "Calculate bulk discounts",
      onClick: onBulkPricingClick,
      disabled: false
    },
    {
      icon: TrendingUp,
      label: "Price Alerts",
      description: "Track price changes",
      onClick: onPriceAlertsClick,
      disabled: false
    },
    {
      icon: Brain,
      label: "AI Insights",
      description: "Smart recommendations",
      onClick: onAIInsightsClick,
      disabled: false
    }
  ];

  return (
    <div ref={dropdownRef} className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-elec-card/50 border-elec-yellow/30 text-elec-light hover:bg-elec-yellow/10 hover:border-elec-yellow/50"
      >
        <MoreHorizontal className="h-4 w-4 mr-2" />
        More Tools
        {selectedCount > 0 && (
          <Badge variant="secondary" className="ml-2 bg-elec-yellow text-elec-dark">
            {selectedCount}
          </Badge>
        )}
        <ChevronDown className={`h-4 w-4 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <Card className="absolute top-full right-0 z-50 mt-2 w-72 bg-elec-card border-elec-yellow/20 shadow-lg">
          <CardContent className="p-0">
            <div className="py-2">
              {tools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (!tool.disabled) {
                        tool.onClick();
                        setIsOpen(false);
                      }
                    }}
                    disabled={tool.disabled}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${
                      tool.disabled
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-elec-yellow/10 text-elec-light'
                    }`}
                  >
                    <Icon className="h-5 w-5 text-elec-yellow" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{tool.label}</span>
                        {tool.badge && (
                          <Badge variant="secondary" className="bg-elec-yellow text-elec-dark text-xs">
                            {tool.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{tool.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MaterialsMoreTools;