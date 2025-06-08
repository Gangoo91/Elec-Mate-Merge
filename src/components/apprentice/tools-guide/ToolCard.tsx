
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, PoundSterling } from "lucide-react";

interface ToolItem {
  name: string;
  description?: string;
  priceRange?: string;
  priority?: "essential" | "recommended" | "optional";
  ukStandard?: string;
}

interface ToolCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  items: (string | ToolItem)[];
  apprenticeTip?: string;
  ukConsideration?: string;
}

const ToolCard = ({ title, icon, description, items, apprenticeTip, ukConsideration }: ToolCardProps) => {
  const formatItem = (item: string | ToolItem) => {
    if (typeof item === 'string') {
      return { name: item, priority: 'recommended' as const };
    }
    return item;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'essential': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'recommended': return 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30';
      case 'optional': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30';
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray/30 h-full">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-base sm:text-lg flex items-center gap-2 sm:gap-3 text-elec-yellow">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
        <ul className="space-y-2 sm:space-y-3">
          {items.map((item, index) => {
            const formattedItem = formatItem(item);
            return (
              <li key={index} className="space-y-1">
                <div className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1 text-xs">•</span>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs sm:text-sm text-white leading-relaxed flex-1">
                        {formattedItem.name}
                      </span>
                      {formattedItem.priority && (
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getPriorityColor(formattedItem.priority)} flex-shrink-0`}
                        >
                          {formattedItem.priority}
                        </Badge>
                      )}
                    </div>
                    {formattedItem.description && (
                      <p className="text-xs text-muted-foreground pl-0">
                        {formattedItem.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-xs">
                      {formattedItem.priceRange && (
                        <span className="text-green-300 flex items-center gap-1">
                          <PoundSterling className="h-3 w-3" />
                          {formattedItem.priceRange}
                        </span>
                      )}
                      {formattedItem.ukStandard && (
                        <span className="text-blue-300">
                          {formattedItem.ukStandard}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {apprenticeTip && (
          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-3 mt-4">
            <h4 className="text-sm font-medium text-elec-yellow mb-1 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Apprentice Tip
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {apprenticeTip}
            </p>
          </div>
        )}

        {ukConsideration && (
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
            <h4 className="text-sm font-medium text-orange-300 mb-1 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              UK Consideration
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {ukConsideration}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ToolCard;
