import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MoreVertical, Scale, Calculator, TrendingUp, Brain, ChevronDown, ChevronUp } from "lucide-react";

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
    <div className="relative">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-[42px] px-4 bg-elec-card/50 border-elec-yellow/30 text-white hover:bg-elec-yellow/10 relative rounded-md"
          >
            <MoreVertical className="h-4 w-4 mr-2" />
            <span className="font-medium">More Tools</span>
            {selectedItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-elec-yellow text-elec-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {selectedItemsCount}
              </span>
            )}
            {isOpen ? (
              <ChevronUp className="h-4 w-4 ml-2" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2" />
            )}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="absolute top-full right-0 z-[9999] mt-2 w-80">
          <Card className="bg-elec-card/95 backdrop-blur-md border-2 border-elec-yellow/40 shadow-2xl shadow-elec-yellow/10">
            <CardContent className="p-2">
              <div className="space-y-1">
                {tools.map((tool) => {
                  const IconComponent = tool.icon;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => handleToolClick(tool.id)}
                      className="w-full text-left px-4 py-3.5 hover:bg-elec-yellow/10 transition-all duration-200 rounded-md group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-lg bg-elec-yellow/10 flex items-center justify-center group-hover:bg-elec-yellow/20 transition-colors">
                            <IconComponent className="h-5 w-5 text-elec-yellow" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-white">{tool.title}</h4>
                            {tool.badge && (
                              <span className="bg-elec-yellow text-elec-dark text-xs font-bold rounded-full h-5 min-w-[20px] px-1.5 flex items-center justify-center">
                                {tool.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-white/60 mt-0.5">{tool.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default MoreToolsDropdown;