import { CheckSquare, AlertTriangle, Clock, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NextStepsChecklistProps {
  failCount: number;
  requiresTestingCount: number;
  recommendations: string[];
}

export const NextStepsChecklist = ({ 
  failCount, 
  requiresTestingCount,
  recommendations 
}: NextStepsChecklistProps) => {
  const actionItems = [];

  if (failCount > 0) {
    actionItems.push({
      icon: AlertTriangle,
      priority: 'critical',
      title: 'Address Failed Checks Immediately',
      description: `${failCount} check${failCount > 1 ? 's' : ''} failed and require immediate attention to ensure safety and compliance.`,
      time: 'Immediate action required',
      color: 'text-red-500',
      bg: 'bg-red-500/10'
    });
  }

  if (requiresTestingCount > 0) {
    actionItems.push({
      icon: Wrench,
      priority: 'high',
      title: 'Schedule On-Site Testing',
      description: `${requiresTestingCount} check${requiresTestingCount > 1 ? 's' : ''} require physical testing with appropriate instruments.`,
      time: 'Schedule within 48 hours',
      color: 'text-amber-500',
      bg: 'bg-amber-500/10'
    });
  }

  if (failCount === 0 && requiresTestingCount === 0) {
    actionItems.push({
      icon: CheckSquare,
      priority: 'low',
      title: 'Complete Final Verification',
      description: 'All visual checks passed. Proceed with comprehensive testing and certification.',
      time: 'At your convenience',
      color: 'text-green-500',
      bg: 'bg-green-500/10'
    });
  }

  return (
    <Card className="p-4 sm:p-6 bg-card border-border/40">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <CheckSquare className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Next Steps</h3>
        </div>

        <div className="space-y-3">
          {actionItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className={`${item.bg} border border-current/20 rounded-lg p-4 space-y-2`}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`h-5 w-5 ${item.color} mt-0.5 shrink-0`} />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-medium text-foreground text-sm">{item.title}</h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${item.color} border-current`}
                      >
                        {item.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
                      <Clock className="h-3 w-3" />
                      {item.time}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {recommendations && recommendations.length > 0 && (
          <div className="pt-4 border-t border-border/40 space-y-2">
            <h4 className="text-sm font-medium text-foreground">Additional Recommendations</h4>
            <ul className="space-y-2">
              {recommendations.slice(0, 5).map((rec, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="flex-1">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};
