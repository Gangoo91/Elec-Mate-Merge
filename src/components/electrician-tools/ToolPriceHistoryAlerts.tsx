import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { TrendingUp, TrendingDown, Bell, Plus, X, AlertTriangle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface PriceAlert {
  id: string;
  toolName: string;
  supplier: string;
  currentPrice: number;
  targetPrice: number;
  isActive: boolean;
  createdAt: Date;
  priceHistory: { date: Date; price: number }[];
}

interface ToolPriceHistoryAlertsProps {
  categoryName: string;
}

const ToolPriceHistoryAlerts: React.FC<ToolPriceHistoryAlertsProps> = ({
  categoryName
}) => {
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);

  const [newAlertTool, setNewAlertTool] = useState("");
  const [newAlertPrice, setNewAlertPrice] = useState("");
  const isMobile = useIsMobile();

  const toggleAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const addAlert = () => {
    if (!newAlertTool || !newAlertPrice) return;
    
    const newAlert: PriceAlert = {
      id: Date.now().toString(),
      toolName: newAlertTool,
      supplier: "Various",
      currentPrice: 0,
      targetPrice: parseFloat(newAlertPrice),
      isActive: true,
      createdAt: new Date(),
      priceHistory: []
    };
    
    setAlerts(prev => [...prev, newAlert]);
    setNewAlertTool("");
    setNewAlertPrice("");
  };

  const getPriceChange = (alert: PriceAlert) => {
    if (alert.priceHistory.length < 2) return { change: 0, percentage: 0 };
    
    const latest = alert.priceHistory[alert.priceHistory.length - 1];
    const previous = alert.priceHistory[alert.priceHistory.length - 2];
    const change = latest.price - previous.price;
    const percentage = (change / previous.price) * 100;
    
    return { change, percentage };
  };

  const activeAlerts = alerts.filter(alert => alert.isActive);
  const recentDrops = alerts.filter(alert => {
    const priceChange = getPriceChange(alert);
    return priceChange.change < 0;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-elec-yellow" />
          Price Alerts & History
        </h2>
        <p className="text-muted-foreground">
          Track price changes and get notified when {categoryName.toLowerCase()} drop to your target price
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-elec-yellow">{activeAlerts.length}</div>
            <div className="text-sm text-muted-foreground">Active Alerts</div>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{recentDrops.length}</div>
            <div className="text-sm text-muted-foreground">Recent Price Drops</div>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-muted-foreground">-</div>
            <div className="text-sm text-muted-foreground">Avg. Savings</div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Alert */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Plus className="h-5 w-5 text-elec-yellow" />
            Create Price Alert
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Tool Name</label>
              <Input
                placeholder="e.g. Fluke 179 Multimeter"
                value={newAlertTool}
                onChange={(e) => setNewAlertTool(e.target.value)}
                className="bg-elec-gray border-elec-yellow/20"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Target Price (£)</label>
              <Input
                type="number"
                placeholder="150.00"
                value={newAlertPrice}
                onChange={(e) => setNewAlertPrice(e.target.value)}
                className="bg-elec-gray border-elec-yellow/20"
              />
            </div>
          </div>
          <Button
            onClick={addAlert}
            disabled={!newAlertTool || !newAlertPrice}
            variant="gold"
            className="w-full md:w-auto"
          >
            <Bell className="h-4 w-4 mr-2" />
            Create Alert
          </Button>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5 text-elec-yellow" />
            Your Price Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {alerts.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Price Alerts</h3>
              <p className="text-muted-foreground">
                Create your first price alert to track tool pricing and get notified of drops.
              </p>
            </div>
          ) : (
            alerts.map(alert => {
              const priceChange = getPriceChange(alert);
              const isNearTarget = alert.currentPrice <= alert.targetPrice * 1.1;
              
              return (
                <div key={alert.id} className="p-4 border border-elec-yellow/20 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium">{alert.toolName}</h4>
                      <p className="text-sm text-muted-foreground">{alert.supplier}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={alert.isActive}
                        onCheckedChange={() => toggleAlert(alert.id)}
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeAlert(alert.id)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Current Price</div>
                      <div className="font-semibold">
                        £{alert.currentPrice > 0 ? alert.currentPrice.toFixed(2) : 'Tracking...'}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Target Price</div>
                      <div className="font-semibold text-elec-yellow">
                        £{alert.targetPrice.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Recent Change</div>
                      <div className={`font-semibold flex items-center gap-1 ${
                        priceChange.change > 0 ? 'text-red-400' : 
                        priceChange.change < 0 ? 'text-green-400' : 'text-muted-foreground'
                      }`}>
                        {priceChange.change !== 0 && (
                          priceChange.change > 0 ? 
                            <TrendingUp className="h-3 w-3" /> : 
                            <TrendingDown className="h-3 w-3" />
                        )}
                        {priceChange.change === 0 ? 'No change' : 
                         `${priceChange.change > 0 ? '+' : ''}£${Math.abs(priceChange.change).toFixed(2)}`}
                      </div>
                    </div>
                  </div>
                  
                  {isNearTarget && alert.currentPrice > 0 && (
                    <div className="mt-3 p-2 bg-elec-yellow/10 rounded border border-elec-yellow/30">
                      <div className="flex items-center gap-2 text-sm text-elec-yellow">
                        <AlertTriangle className="h-4 w-4" />
                        Close to target price! Consider purchasing now.
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-3 flex gap-2">
                    <Badge variant={alert.isActive ? "success" : "secondary"} className="text-xs">
                      {alert.isActive ? "Active" : "Paused"}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Created {alert.createdAt.toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Recent Price Movements */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-green-400" />
            Recent Price Drops in {categoryName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentDrops.length === 0 ? (
            <div className="text-center py-6">
              <TrendingUp className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">
                No recent price drops detected. We'll notify you when prices fall.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentDrops.map(alert => {
                const priceChange = getPriceChange(alert);
                return (
                  <div key={alert.id} className="p-3 border border-green-400/20 bg-green-400/5 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{alert.toolName}</div>
                        <div className="text-sm text-muted-foreground">{alert.supplier}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-semibold">
                          £{Math.abs(priceChange.change).toFixed(2)} saved
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {priceChange.percentage.toFixed(1)}% decrease
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ToolPriceHistoryAlerts;