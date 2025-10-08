import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap } from "lucide-react";
import { LoadBalancingResult } from "@/lib/calculators/engines/loadBalancingEngine";

interface LoadBalancingViewProps {
  balancing: LoadBalancingResult;
}

export const LoadBalancingView = ({ balancing }: LoadBalancingViewProps) => {
  const maxLoad = Math.max(balancing.l1Total, balancing.l2Total, balancing.l3Total);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Three-Phase Load Balancing
          </CardTitle>
          <Badge variant={balancing.compliant ? "default" : "destructive"}>
            {balancing.imbalance.toFixed(1)}% Imbalance
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">L1 (Phase 1)</span>
              <span>{balancing.l1Total.toFixed(1)}A</span>
            </div>
            <Progress value={(balancing.l1Total / maxLoad) * 100} className="h-3" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">L2 (Phase 2)</span>
              <span>{balancing.l2Total.toFixed(1)}A</span>
            </div>
            <Progress value={(balancing.l2Total / maxLoad) * 100} className="h-3" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">L3 (Phase 3)</span>
              <span>{balancing.l3Total.toFixed(1)}A</span>
            </div>
            <Progress value={(balancing.l3Total / maxLoad) * 100} className="h-3" />
          </div>
        </div>

        {balancing.recommendations.length > 0 && (
          <div className="pt-4 border-t border-border space-y-2">
            <p className="text-sm font-medium">Recommendations</p>
            <ul className="space-y-1">
              {balancing.recommendations.map((rec, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span>•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-4 border-t border-border">
          <p className="text-sm font-medium mb-3">Circuit Allocation</p>
          <div className="space-y-2">
            {balancing.circuitAllocation.map((alloc) => (
              <div key={alloc.circuitNumber} className="flex items-center justify-between text-xs bg-muted/50 rounded p-2">
                <span className="font-medium">C{alloc.circuitNumber}: {alloc.name}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">{alloc.phase}</Badge>
                  <span className="text-muted-foreground">{alloc.loadContribution.toFixed(1)}A</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
