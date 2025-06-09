
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bell, Plus, Trash2, TrendingDown, TrendingUp, AlertCircle, Check } from "lucide-react";

const PriceAlertsTab = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      toolName: "Fluke 1663 Multifunction Tester",
      currentPrice: 649.99,
      targetPrice: 550.00,
      supplier: "RS Components",
      status: "active",
      created: "2024-01-15",
      triggered: false
    },
    {
      id: 2,
      toolName: "DeWalt 18V Combi Drill Kit",
      currentPrice: 149.99,
      targetPrice: 120.00,
      supplier: "Screwfix",
      status: "active",
      created: "2024-01-18",
      triggered: false
    },
    {
      id: 3,
      toolName: "Kewtech KT65DL MFT",
      currentPrice: 299.99,
      targetPrice: 250.00,
      supplier: "City Electrical Factors",
      status: "triggered",
      created: "2024-01-10",
      triggered: true
    }
  ]);

  const [newAlert, setNewAlert] = useState({
    toolName: "",
    targetPrice: "",
    supplier: "Any Supplier"
  });

  const priceHistory = [
    {
      tool: "Fluke 1663 MFT",
      changes: [
        { date: "2024-01-20", price: 649.99, change: 0 },
        { date: "2024-01-19", price: 675.00, change: -3.7 },
        { date: "2024-01-18", price: 699.99, change: -7.1 },
        { date: "2024-01-17", price: 750.00, change: -13.3 }
      ]
    }
  ];

  const addAlert = () => {
    if (newAlert.toolName && newAlert.targetPrice) {
      setAlerts([...alerts, {
        id: alerts.length + 1,
        toolName: newAlert.toolName,
        currentPrice: 0,
        targetPrice: parseFloat(newAlert.targetPrice),
        supplier: newAlert.supplier,
        status: "active",
        created: new Date().toISOString().split('T')[0],
        triggered: false
      }]);
      setNewAlert({ toolName: "", targetPrice: "", supplier: "Any Supplier" });
    }
  };

  const removeAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-white flex items-center justify-center gap-2">
          <Bell className="h-6 w-6 text-elec-yellow" />
          Price Alerts & Monitoring
        </h2>
        <p className="text-muted-foreground">
          Never miss a deal! Set up price alerts for your favourite tools and get notified when prices drop.
        </p>
      </div>

      {/* Create New Alert */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Price Alert
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-white mb-2 block">Tool Name</label>
              <Input
                placeholder="e.g. Fluke 1663 Multifunction Tester"
                value={newAlert.toolName}
                onChange={(e) => setNewAlert({...newAlert, toolName: e.target.value})}
                className="bg-elec-dark border-elec-yellow/30"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Target Price (£)</label>
              <Input
                type="number"
                placeholder="550.00"
                value={newAlert.targetPrice}
                onChange={(e) => setNewAlert({...newAlert, targetPrice: e.target.value})}
                className="bg-elec-dark border-elec-yellow/30"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Supplier</label>
              <select 
                value={newAlert.supplier}
                onChange={(e) => setNewAlert({...newAlert, supplier: e.target.value})}
                className="w-full p-2 bg-elec-dark border border-elec-yellow/30 rounded text-white"
              >
                <option>Any Supplier</option>
                <option>Screwfix</option>
                <option>Toolstation</option>
                <option>RS Components</option>
                <option>City Electrical Factors</option>
                <option>Amazon Business</option>
              </select>
            </div>
          </div>
          <Button onClick={addAlert} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <Plus className="h-4 w-4 mr-2" />
            Create Alert
          </Button>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white">Your Price Alerts ({alerts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-4 border border-elec-yellow/20 rounded-lg bg-elec-dark/30">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-white">{alert.toolName}</h3>
                      <Badge className={`${
                        alert.status === 'triggered' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {alert.status === 'triggered' ? (
                          <>
                            <Check className="h-3 w-3 mr-1" />
                            Price Reached!
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Monitoring
                          </>
                        )}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Target Price:</span>
                        <div className="text-elec-yellow font-medium">£{alert.targetPrice.toFixed(2)}</div>
                      </div>
                      {alert.currentPrice > 0 && (
                        <div>
                          <span className="text-muted-foreground">Current Price:</span>
                          <div className="text-white font-medium">£{alert.currentPrice.toFixed(2)}</div>
                        </div>
                      )}
                      <div>
                        <span className="text-muted-foreground">Supplier:</span>
                        <div className="text-white">{alert.supplier}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Created:</span>
                        <div className="text-white">{alert.created}</div>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeAlert(alert.id)}
                    className="border-red-500/30 hover:bg-red-500/10 text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Price History Trends */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white">Recent Price Movements</CardTitle>
        </CardHeader>
        <CardContent>
          {priceHistory.map((item, index) => (
            <div key={index} className="space-y-3">
              <h3 className="font-medium text-white">{item.tool}</h3>
              <div className="space-y-2">
                {item.changes.map((change, changeIndex) => (
                  <div key={changeIndex} className="flex items-center justify-between p-2 bg-elec-dark/30 rounded">
                    <span className="text-sm text-muted-foreground">{change.date}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">£{change.price.toFixed(2)}</span>
                      {change.change !== 0 && (
                        <div className={`flex items-center gap-1 text-xs ${
                          change.change < 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {change.change < 0 ? (
                            <TrendingDown className="h-3 w-3" />
                          ) : (
                            <TrendingUp className="h-3 w-3" />
                          )}
                          {Math.abs(change.change)}%
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Alert Tips */}
      <Card className="border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-elec-gray">
        <CardHeader>
          <CardTitle className="text-blue-400">💡 Price Alert Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <ul className="space-y-2">
            <li>• Set realistic target prices - check historical data first</li>
            <li>• Monitor multiple suppliers for the same tool</li>
            <li>• Consider seasonal sales periods (Black Friday, January sales)</li>
            <li>• Factor in delivery costs when comparing prices</li>
            <li>• Popular tools rarely drop below wholesale prices</li>
            <li>• Set alerts for tools you need in the next 3-6 months</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceAlertsTab;
