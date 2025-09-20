
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { Star, Shield, Zap, CheckCircle, Check, ExternalLink } from "lucide-react";

interface Tool {
  name: string;
  description: string;
  priceRange: string;
  priority: "essential" | "recommended" | "optional";
  ukStandard?: string;
}

interface ToolCardProps {
  title: string;
  icon: ReactNode;
  description: string;
  items: Tool[];
  apprenticeTip: string;
  ukConsideration: string;
}

const ToolCard = ({ title, icon, description, items, apprenticeTip, ukConsideration }: ToolCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "essential": return "destructive";
      case "recommended": return "warning";
      case "optional": return "success";
      default: return "secondary";
    }
  };

  const getInfoGridData = (tool: Tool) => [
    {
      icon: <Zap className="w-4 h-4 text-elec-yellow" />,
      label: "Specifications",
      value: tool.description.split(' ').slice(0, 2).join(' ') || "Professional Grade"
    },
    {
      icon: <Shield className="w-4 h-4 text-blue-400" />,
      label: "Standard",
      value: tool.ukStandard || "BS7671 18th"
    },
    {
      icon: <Star className="w-4 h-4 text-yellow-400" />,
      label: "Rating",
      value: "4.5/5"
    },
    {
      icon: <CheckCircle className="w-4 h-4 text-green-400" />,
      label: "Stock",
      value: "In Stock"
    }
  ];

  const getFeatures = (tool: Tool) => [
    "Professional quality construction",
    "BS7671 18th edition compliant",
    "Suitable for commercial use"
  ];

  return (
    <Card className="bg-gradient-to-br from-card/50 via-card/30 to-transparent border-border hover:border-elec-yellow/30 hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">RS Components</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-muted-foreground">4.5</span>
            </div>
          </div>
        </div>
        <CardTitle className="text-elec-yellow text-lg leading-tight">{title}</CardTitle>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground text-sm">{item.name}</h4>
              <Badge variant={getPriorityColor(item.priority)} className="text-xs">
                {item.priority}
              </Badge>
            </div>

            {/* 2x2 Information Grid */}
            <div className="grid grid-cols-2 gap-2">
              {getInfoGridData(item).map((info, idx) => (
                <div key={idx} className="border border-border rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    {info.icon}
                    <span className="text-xs text-muted-foreground">{info.label}</span>
                  </div>
                  <p className="text-xs font-medium text-foreground">{info.value}</p>
                </div>
              ))}
            </div>

            {/* Features List */}
            <div className="space-y-2">
              <h5 className="text-xs font-medium text-muted-foreground">Key Features:</h5>
              <div className="space-y-1">
                {getFeatures(item).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-green-400" />
                    <span className="text-xs text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-elec-yellow">{item.priceRange}</span>
                <span className="text-xs text-muted-foreground">inc. VAT</span>
              </div>
              <Button size="sm" className="bg-elec-yellow hover:bg-elec-yellow/90 text-background">
                View Product
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>

            {index < items.length - 1 && <div className="border-b border-border/50 pt-4" />}
          </div>
        ))}

        {/* Simplified Tips Section */}
        <div className="mt-6 space-y-3">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
            <h6 className="text-xs font-medium text-blue-300 mb-1">Apprentice Tip:</h6>
            <p className="text-xs text-blue-200">{apprenticeTip}</p>
          </div>
          
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
            <h6 className="text-xs font-medium text-amber-300 mb-1">UK Consideration:</h6>
            <p className="text-xs text-amber-200">{ukConsideration}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolCard;
