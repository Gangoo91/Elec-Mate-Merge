import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface QueueCircuit {
  name: string;
  loadType: string;
  status: 'pending' | 'processing' | 'complete';
}

interface CircuitQueueViewerProps {
  circuits: QueueCircuit[];
}

export function CircuitQueueViewer({ circuits }: CircuitQueueViewerProps) {
  const completedCount = circuits.filter(c => c.status === 'complete').length;
  const totalCount = circuits.length;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Circuit Processing</CardTitle>
          <Badge variant="secondary">
            {completedCount} / {totalCount}
          </Badge>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mt-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-2 max-h-[300px] overflow-y-auto">
        {circuits.map((circuit, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg border transition-all",
              circuit.status === 'complete' && "bg-emerald-500/5 border-emerald-500/20",
              circuit.status === 'processing' && "bg-primary/5 border-primary/20 shadow-sm",
              circuit.status === 'pending' && "bg-muted/30 border-muted"
            )}
          >
            <div className="flex-shrink-0">
              {circuit.status === 'complete' && (
                <CheckCircle className="h-5 w-5 text-emerald-500" />
              )}
              {circuit.status === 'processing' && (
                <Loader2 className="h-5 w-5 text-primary animate-spin" />
              )}
              {circuit.status === 'pending' && (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className={cn(
                "font-medium text-sm truncate",
                circuit.status === 'pending' && "text-muted-foreground"
              )}>
                {circuit.name}
              </div>
              <div className="text-xs text-muted-foreground truncate capitalize">
                {circuit.loadType.replace('-', ' ')}
              </div>
            </div>
            <Badge
              variant={circuit.status === 'complete' ? 'default' : 'secondary'}
              className={cn(
                "text-xs",
                circuit.status === 'complete' && "bg-emerald-500",
                circuit.status === 'processing' && "bg-primary"
              )}
            >
              {circuit.status === 'complete' && 'Done'}
              {circuit.status === 'processing' && 'Processing'}
              {circuit.status === 'pending' && 'Waiting'}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
