import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Target } from "lucide-react";

interface FutureWorkPipelineCardProps {
  pipeline: any[];
}

const FutureWorkPipelineCard = ({ pipeline }: FutureWorkPipelineCardProps) => {
  const totalValue = pipeline.reduce((sum, p) => sum + (p.estimatedValue || 0), 0);

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  return (
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-elec-yellow" />
            Future Work Pipeline
          </CardTitle>
          <Badge className="bg-elec-yellow/30 text-elec-yellow border-elec-yellow/50">
            £{totalValue.toFixed(0)} total
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {pipeline.map((item, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-background/30 border border-border/30">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1">
                  <div className="font-medium">{item.opportunity}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {item.description}
                  </div>
                </div>
                <Badge className={getPriorityColor(item.priority)}>
                  {item.priority}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{item.timing}</span>
                </div>
                <div className="text-green-500 font-medium">
                  £{item.estimatedValue.toFixed(0)}
                </div>
                {item.trigger && (
                  <div className="flex-1 text-right">
                    Trigger: {item.trigger}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FutureWorkPipelineCard;
