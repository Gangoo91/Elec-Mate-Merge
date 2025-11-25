import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Wrench } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface LabourTask {
  description: string;
  hours: number;
  teamComposition?: {
    electricians: number;
    apprentices: number;
  };
  electricianHours?: number;
  apprenticeHours?: number;
  electricianRate: number;
  apprenticeRate?: number;
  electricianCost: number;
  apprenticeCost?: number;
  total: number;
  category?: 'first-fix' | 'second-fix' | 'testing' | 'commissioning' | 'general';
}

interface DetailedLabourBreakdownProps {
  tasks: LabourTask[];
  electricianTotalHours: number;
  apprenticeTotalHours: number;
  electricianSubtotal: number;
  apprenticeSubtotal: number;
  labourSubtotal: number;
  overheadAllocation?: number;
  travelTime?: number;
  travelCost?: number;
  finalTotal: number;
}

export const DetailedLabourBreakdown = ({
  tasks,
  electricianTotalHours,
  apprenticeTotalHours,
  electricianSubtotal,
  apprenticeSubtotal,
  labourSubtotal,
  overheadAllocation = 0,
  travelTime = 0,
  travelCost = 0,
  finalTotal
}: DetailedLabourBreakdownProps) => {
  const totalHours = electricianTotalHours + apprenticeTotalHours;
  
  const getCategoryBadge = (category?: string) => {
    const badges: Record<string, { label: string; color: string }> = {
      'first-fix': { label: 'First Fix', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30' },
      'second-fix': { label: 'Second Fix', color: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30' },
      'testing': { label: 'Testing', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30' },
      'commissioning': { label: 'Commissioning', color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30' },
      'general': { label: 'General', color: 'bg-muted text-white border-border' }
    };

    const badge = category ? badges[category] : badges.general;
    return (
      <Badge variant="outline" className={`text-xs ${badge.color}`}>
        {badge.label}
      </Badge>
    );
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Detailed Labour Breakdown
          <Badge variant="outline" className="ml-auto">
            {totalHours.toFixed(1)} hours
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Team Composition Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-muted/30">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-white">Qualified Electrician</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{electricianTotalHours.toFixed(1)} hrs</p>
            <p className="text-sm text-white">
              @ £{tasks[0]?.electricianRate || 50}/hr = £{electricianSubtotal.toFixed(2)}
            </p>
          </div>
          {apprenticeTotalHours > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium text-white">Apprentice</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{apprenticeTotalHours.toFixed(1)} hrs</p>
              <p className="text-sm text-white">
                @ £{tasks[0]?.apprenticeRate || 25}/hr = £{apprenticeSubtotal.toFixed(2)}
              </p>
            </div>
          )}
        </div>

        {/* Task Breakdown */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Installation Tasks</h4>
          {tasks.map((task, idx) => (
            <Card key={idx} className="border-border/50">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-foreground">{task.description}</p>
                      {task.category && getCategoryBadge(task.category)}
                    </div>
                    
                    {task.teamComposition && (
                      <div className="flex items-center gap-3 text-xs text-white">
                        {task.teamComposition.electricians > 0 && (
                          <span>
                            👷 {task.teamComposition.electricians} Electrician{task.teamComposition.electricians > 1 ? 's' : ''}
                          </span>
                        )}
                        {task.teamComposition.apprentices > 0 && (
                          <span>
                            🔧 {task.teamComposition.apprentices} Apprentice{task.teamComposition.apprentices > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-foreground">£{task.total.toFixed(2)}</p>
                    <p className="text-xs text-white">{task.hours.toFixed(1)} hrs total</p>
                  </div>
                </div>

                {/* Time Distribution */}
                {task.electricianHours !== undefined && task.apprenticeHours !== undefined && (
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white">Electrician</span>
                        <span className="font-medium">
                          {task.electricianHours.toFixed(1)}h × £{task.electricianRate}/hr = £{task.electricianCost.toFixed(2)}
                        </span>
                      </div>
                      <Progress 
                        value={(task.electricianHours / task.hours) * 100} 
                        className="h-1.5"
                      />
                    </div>
                    
                    {task.apprenticeHours > 0 && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white">Apprentice</span>
                          <span className="font-medium">
                            {task.apprenticeHours.toFixed(1)}h × £{task.apprenticeRate}/hr = £{task.apprenticeCost?.toFixed(2)}
                          </span>
                        </div>
                        <Progress 
                          value={(task.apprenticeHours / task.hours) * 100} 
                          className="h-1.5 [&>div]:bg-emerald-500"
                        />
                      </div>
                    )}
                    
                    {task.teamComposition && task.teamComposition.electricians > 0 && task.teamComposition.apprentices > 0 && (
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                        ✓ 2-person team saves ~30% time
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Totals */}
        <div className="space-y-2 pt-4 border-t">
          <div className="flex items-center justify-between px-4 py-2 rounded bg-muted/30">
            <span className="text-sm text-white">Electrician Labour</span>
            <span className="font-semibold text-foreground">
              {electricianTotalHours.toFixed(1)}h = £{electricianSubtotal.toFixed(2)}
            </span>
          </div>
          
          {apprenticeSubtotal > 0 && (
            <div className="flex items-center justify-between px-4 py-2 rounded bg-muted/30">
              <span className="text-sm text-white">Apprentice Labour</span>
              <span className="font-semibold text-foreground">
                {apprenticeTotalHours.toFixed(1)}h = £{apprenticeSubtotal.toFixed(2)}
              </span>
            </div>
          )}
          
          <div className="flex items-center justify-between px-4 py-2 rounded bg-muted/30">
            <span className="text-sm font-medium">Direct Labour Cost</span>
            <span className="font-bold text-foreground">£{labourSubtotal.toFixed(2)}</span>
          </div>

          {travelTime > 0 && travelCost > 0 && (
            <div className="flex items-center justify-between px-4 py-2 rounded bg-muted/30">
              <span className="text-sm text-white">
                Travel & Site Setup ({travelTime}h)
              </span>
              <span className="font-semibold text-foreground">+£{travelCost.toFixed(2)}</span>
            </div>
          )}

          {overheadAllocation > 0 && (
            <div className="flex items-center justify-between px-4 py-2 rounded bg-muted/30">
              <span className="text-sm text-white">Allocated Overheads</span>
              <span className="font-semibold text-foreground">+£{overheadAllocation.toFixed(2)}</span>
            </div>
          )}

          <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-primary/10 border-2 border-primary/30">
            <span className="font-bold">LABOUR TOTAL</span>
            <span className="font-bold text-xl text-primary">£{finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
