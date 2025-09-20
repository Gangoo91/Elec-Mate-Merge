
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ReactNode } from "react";

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
      case "essential": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "recommended": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "optional": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <Card className="bg-gradient-to-br from-white/10 via-white/5 to-transparent border-white/10 hover:border-elec-yellow/30 hover:shadow-xl hover:shadow-elec-yellow/10 hover:scale-[1.02] transition-all duration-300 rounded-xl overflow-hidden h-full">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          {icon}
          <CardTitle className="text-elec-yellow text-lg">{title}</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="border border-elec-yellow/30 rounded-lg p-3">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-white text-sm">{item.name}</h4>
                <Badge className={getPriorityColor(item.priority)} variant="outline">
                  {item.priority}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-elec-yellow font-medium">{item.priceRange}</span>
                {item.ukStandard && (
                  <span className="text-blue-300">{item.ukStandard}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <Alert className="border-blue-500/30 bg-blue-500/10">
          <AlertDescription className="text-blue-200 text-xs">
            <strong>Apprentice Tip:</strong> {apprenticeTip}
          </AlertDescription>
        </Alert>

        <Alert className="border-amber-500/30 bg-amber-500/10">
          <AlertDescription className="text-amber-200 text-xs">
            <strong>UK Consideration:</strong> {ukConsideration}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default ToolCard;
