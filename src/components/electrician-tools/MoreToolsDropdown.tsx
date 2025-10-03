import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MoreHorizontal, Scale, Calculator, TrendingUp, Brain, ChevronDown } from "lucide-react";

interface MoreToolsDropdownProps {
  onTabChange: (tab: string) => void;
  selectedItemsCount: number;
}

const MoreToolsDropdown = ({ onTabChange, selectedItemsCount }: MoreToolsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const tools = [
    {
      id: "compare",
      title: "Compare Tools",
      description: "Side-by-side comparison",
      icon: Scale,
      badge: selectedItemsCount > 0 ? selectedItemsCount.toString() : undefined
    },
    {
      id: "bulk",
      title: "Bulk Pricing",
      description: "Calculate bulk discounts",
      icon: Calculator
    },
    {
      id: "alerts",
      title: "Price Alerts",
      description: "Track price changes",
      icon: TrendingUp
    },
    {
      id: "ai",
      title: "AI Insights",
      description: "Smart recommendations",
      icon: Brain
    }
  ];

  const handleToolClick = (toolId: string) => {
    onTabChange(toolId);
    setIsOpen(false);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="touch-target mobile-interactive bg-elec-gray/50 border-elec-yellow/30 text-elec-light hover:bg-elec-yellow/10 data-[state=open]:bg-elec-yellow/10"
        >
          <MoreHorizontal className="h-4 w-4 mr-2" />
          More Tools
          <ChevronDown className={`h-4 w-4 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          {selectedItemsCount > 0 && (
            <Badge 
              variant="secondary" 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-elec-yellow text-elec-dark border-elec-dark/20"
            >
              {selectedItemsCount}
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
                    className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-elec-yellow/10 text-elec-light active:bg-elec-yellow/20"
                  >
                    <Icon className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm truncate">{tool.title}</span>
                        {tool.badge && (
                          <Badge variant="secondary" className="bg-elec-yellow text-elec-dark text-xs">
                            {tool.badge}
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

export default MoreToolsDropdown;