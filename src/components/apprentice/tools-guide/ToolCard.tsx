
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
      case "recommended": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "optional": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray h-full mx-1 sm:mx-0">
      <CardHeader className="text-center px-2 sm:px-3 py-3 sm:py-4">
        <div className="flex flex-col items-center gap-2 sm:gap-3 mb-2">
          {icon}
          <CardTitle className="text-elec-yellow text-base sm:text-lg">{title}</CardTitle>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardHeader>
      
      <CardContent className="space-y-3 sm:space-y-4 px-2 sm:px-3 pb-3 sm:pb-4">
        <div className="space-y-2 sm:space-y-3">
          {items.map((item, index) => (
            <div key={index} className="border border-elec-yellow/30 rounded-lg p-3 sm:p-4">
              <div className="flex justify-center mb-2">
                <Badge className={getPriorityColor(item.priority)} variant="outline">
                  {item.priority}
                </Badge>
              </div>
              <h4 className="font-medium text-white text-sm text-center mb-1 sm:mb-2">{item.name}</h4>
              <p className="text-xs text-muted-foreground mb-2 sm:mb-3 text-center leading-tight">{item.description}</p>
              <div className="flex items-center justify-between text-xs border-t border-elec-yellow/20 pt-2">
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
