import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      description: "Compare up to 3 tools side by side",
      icon: Scale,
      badge: selectedItemsCount > 0 ? selectedItemsCount.toString() : undefined
    },
    {
      id: "bulk",
      title: "Bulk Pricing",
      description: "Calculate bulk purchase pricing",
      icon: Calculator
    },
    {
      id: "alerts",
      title: "Price Alerts",
      description: "Set up price drop notifications",
      icon: TrendingUp
    },
    {
      id: "ai",
      title: "AI Insights",
      description: "Get AI-powered tool recommendations",
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
            className="bg-elec-card/50 border-elec-yellow/20 text-elec-light hover:bg-elec-yellow/10 relative"
          >
            <MoreHorizontal className="h-4 w-4 mr-2" />
            More Tools
            {selectedItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-elec-yellow text-elec-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {selectedItemsCount}
              </span>
            )}
            <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="absolute top-full left-0 right-0 md:left-auto md:right-0 z-[9999] mt-2 mx-4 md:mx-0 md:w-80 max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-1rem)]">
          <Card className="bg-elec-card border-elec-yellow/20 shadow-lg backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="divide-y divide-elec-yellow/10">
                {tools.map((tool) => {
                  const IconComponent = tool.icon;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => handleToolClick(tool.id)}
                      className="w-full text-left p-4 hover:bg-elec-yellow/10 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <IconComponent className="h-5 w-5 text-elec-yellow" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-elec-light">{tool.title}</h4>
                            {tool.badge && (
                              <span className="bg-elec-yellow text-elec-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {tool.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-text-muted mt-1">{tool.description}</p>
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