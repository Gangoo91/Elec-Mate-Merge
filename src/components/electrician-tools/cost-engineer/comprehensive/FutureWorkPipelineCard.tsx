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
    <Card className="border-0 sm:border border-elec-yellow/20 rounded-none sm:rounded-xl">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl sm:text-lg font-bold text-white flex items-center gap-2">
            <Target className="h-5 w-5 text-elec-yellow" />
            Future Work Pipeline
          </CardTitle>
          <Badge className="bg-elec-yellow/30 text-elec-yellow border-elec-yellow/50">
            £{totalValue.toFixed(0)} total
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6">
        <div className="space-y-3">
          {pipeline.map((item, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-background/30 border border-border/30 text-left space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="font-medium text-white text-base leading-snug flex-1">
                  {item.opportunity}
                </div>
                <Badge className={getPriorityColor(item.priority)}>
                  {item.priority}
                </Badge>
              </div>
              
              <div className="text-base text-white leading-relaxed">
                {item.description}
              </div>
              
              <div className="space-y-2 text-sm text-white">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                  <span>{item.timing}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-medium text-base">
                    £{item.estimatedValue.toFixed(0)}
                  </span>
                </div>
                
                {item.trigger && (
                  <div className="flex items-start gap-2 pt-1">
                    <span className="text-white/70 flex-shrink-0">Trigger:</span>
                    <span className="text-white">{item.trigger}</span>
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
