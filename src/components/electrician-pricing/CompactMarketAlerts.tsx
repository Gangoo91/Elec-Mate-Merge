
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Info, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Alert {
  id: number;
  message: string;
  date: string;
  type: "warning" | "info";
}

interface CompactMarketAlertsProps {
  alerts: Alert[];
}

const CompactMarketAlerts = ({ alerts }: CompactMarketAlertsProps) => {
  const [expanded, setExpanded] = useState(false);
  const displayAlerts = expanded ? alerts : alerts.slice(0, 2);

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bell className="h-5 w-5 text-elec-yellow" />
          Market Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {displayAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`flex items-start gap-3 p-3 rounded-md text-sm ${
                alert.type === "warning" ? "bg-amber-500/10 border border-amber-500/20" : "bg-blue-500/10 border border-blue-500/20"
              }`}
            >
              {alert.type === "warning" ? (
                <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
              ) : (
                <Info className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="leading-relaxed">{alert.message}</p>
                <span className="text-xs text-muted-foreground mt-1 block">{alert.date}</span>
              </div>
            </div>
          ))}
        </div>
        
        {alerts.length > 2 && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-3 text-xs"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show Less' : `Show All Alerts (${alerts.length})`}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CompactMarketAlerts;
