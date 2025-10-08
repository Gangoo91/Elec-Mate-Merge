import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Zap, TrendingUp, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface SystemSummaryProps {
  totalCircuits: number;
  totalLoad: number;
  diversifiedLoad: number;
  diversityFactor: number;
  mainSwitchRating: number;
  utilization: number;
  compliantCircuits: number;
  warnings: string[];
}

export const SystemSummary = ({
  totalCircuits,
  totalLoad,
  diversifiedLoad,
  diversityFactor,
  mainSwitchRating,
  utilization,
  compliantCircuits,
  warnings
}: SystemSummaryProps) => {
  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          System Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Total Circuits</p>
            <p className="text-2xl font-bold">{totalCircuits}</p>
            <Badge variant={compliantCircuits === totalCircuits ? "default" : "destructive"} className="text-xs">
              {compliantCircuits}/{totalCircuits} Compliant
            </Badge>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Connected Load</p>
            <p className="text-2xl font-bold">{(totalLoad / 1000).toFixed(1)}kW</p>
            <p className="text-xs text-muted-foreground">{totalLoad}W</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              After Diversity
            </p>
            <p className="text-2xl font-bold">{(diversifiedLoad / 1000).toFixed(1)}kW</p>
            <p className="text-xs text-muted-foreground">{diversityFactor.toFixed(2)} factor</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Main Switch</p>
            <p className="text-2xl font-bold">{mainSwitchRating}A</p>
            <p className="text-xs text-muted-foreground">{utilization.toFixed(0)}% utilization</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Main Switch Utilization</span>
            <span className="font-medium">{utilization.toFixed(1)}%</span>
          </div>
          <Progress 
            value={utilization} 
            className={utilization > 80 ? "bg-destructive/20" : utilization > 60 ? "bg-yellow-500/20" : ""}
          />
          {utilization > 80 && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              High utilization - consider upgrading main switch
            </p>
          )}
        </div>

        {warnings.length > 0 && (
          <div className="pt-2 border-t border-border space-y-2">
            <p className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              System Warnings
            </p>
            <ul className="space-y-1">
              {warnings.slice(0, 3).map((warning, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-destructive">•</span>
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
