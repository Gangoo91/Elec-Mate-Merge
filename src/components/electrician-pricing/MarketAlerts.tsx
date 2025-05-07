
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Info } from "lucide-react";

interface Alert {
  id: number;
  message: string;
  date: string;
  type: "warning" | "info";
}

interface MarketAlertsProps {
  alerts: Alert[];
}

const MarketAlerts = ({ alerts }: MarketAlertsProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-elec-yellow" />
          Market Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`flex items-start p-3 rounded-md text-sm ${
                alert.type === "warning" ? "bg-amber-500/10" : "bg-blue-500/10"
              }`}
            >
              <Info className={`h-5 w-5 mr-2 flex-shrink-0 ${
                alert.type === "warning" ? "text-amber-400" : "text-blue-400"
              }`} />
              <div>
                <p className="mb-1">{alert.message}</p>
                <span className="text-xs text-muted-foreground">{alert.date}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketAlerts;
