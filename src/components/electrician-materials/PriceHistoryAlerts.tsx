import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp, TrendingDown, Bell, BellOff, Calendar, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface PriceHistoryEntry {
  date: string;
  price: number;
  supplier: string;
  productName: string;
}

interface PriceAlert {
  id?: string;
  userId: string;
  productName: string;
  targetPrice: number;
  currentPrice: number;
  supplier?: string;
  alertType: 'below' | 'above' | 'change';
  isActive: boolean;
  createdAt?: string;
}

interface PriceHistoryAlertsProps {
  categoryId?: string;
  selectedProduct?: any;
  currentUserId?: string;
}

const PriceHistoryAlerts = ({ categoryId, selectedProduct, currentUserId = "demo-user" }: PriceHistoryAlertsProps) => {
  const [priceHistory, setPriceHistory] = useState<PriceHistoryEntry[]>([]);
  const [userAlerts, setUserAlerts] = useState<PriceAlert[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isLoadingAlerts, setIsLoadingAlerts] = useState(false);
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [seasonalPatterns, setSeasonalPatterns] = useState<any>(null);
  
  // Alert form state
  const [alertForm, setAlertForm] = useState({
    targetPrice: '',
    alertType: 'below' as 'below' | 'above' | 'change',
    supplier: 'Any'
  });

  useEffect(() => {
    if (selectedProduct) {
      loadPriceHistory();
      loadSeasonalPatterns();
    }
    loadUserAlerts();
  }, [selectedProduct, currentUserId]);

  const loadPriceHistory = async () => {
    if (!selectedProduct) return;
    
    setIsLoadingHistory(true);
    try {
      const { data, error } = await supabase.functions.invoke('price-history-alerts', {
        body: {
          action: 'get_price_history',
          productName: selectedProduct.name,
          days: 30
        }
      });

      if (error) throw error;
      setPriceHistory(data.history || []);
    } catch (error) {
      console.error('Failed to load price history:', error);
      toast({
        title: "Failed to load price history",
        description: "Unable to fetch historical pricing data.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const loadSeasonalPatterns = async () => {
    if (!selectedProduct) return;
    
    try {
      const { data, error } = await supabase.functions.invoke('price-history-alerts', {
        body: {
          action: 'get_seasonal_patterns',
          productCategory: selectedProduct.category
        }
      });

      if (error) throw error;
      setSeasonalPatterns(data);
    } catch (error) {
      console.error('Failed to load seasonal patterns:', error);
    }
  };

  const loadUserAlerts = async () => {
    setIsLoadingAlerts(true);
    try {
      const { data, error } = await supabase.functions.invoke('price-history-alerts', {
        body: {
          action: 'get_user_alerts',
          userId: currentUserId
        }
      });

      if (error) throw error;
      setUserAlerts(data.alerts || []);
    } catch (error) {
      console.error('Failed to load user alerts:', error);
    } finally {
      setIsLoadingAlerts(false);
    }
  };

  const createPriceAlert = async () => {
    if (!selectedProduct || !alertForm.targetPrice) return;

    try {
      const { data, error } = await supabase.functions.invoke('price-history-alerts', {
        body: {
          action: 'add_price_alert',
          userId: currentUserId,
          productName: selectedProduct.name,
          targetPrice: parseFloat(alertForm.targetPrice),
          currentPrice: parseFloat(selectedProduct.price.replace('£', '')),
          supplier: alertForm.supplier === 'Any' ? undefined : alertForm.supplier,
          alertType: alertForm.alertType
        }
      });

      if (error) throw error;

      toast({
        title: "Price Alert Created",
        description: data.message,
      });

      setShowCreateAlert(false);
      setAlertForm({ targetPrice: '', alertType: 'below', supplier: 'Any' });
      loadUserAlerts();
    } catch (error) {
      console.error('Failed to create alert:', error);
      toast({
        title: "Failed to create alert",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  const formatPriceHistoryData = () => {
    if (!priceHistory.length) return [];
    
    // Group by date and calculate average price per day
    const groupedByDate = priceHistory.reduce((acc, entry) => {
      if (!acc[entry.date]) {
        acc[entry.date] = [];
      }
      acc[entry.date].push(entry.price);
      return acc;
    }, {} as Record<string, number[]>);

    return Object.entries(groupedByDate).map(([date, prices]) => ({
      date: new Date(date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }),
      fullDate: date,
      price: Math.round((prices.reduce((sum, p) => sum + p, 0) / prices.length) * 100) / 100,
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices)
    })).sort((a, b) => new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime());
  };

  const chartData = formatPriceHistoryData();
  const latestPrice = chartData[chartData.length - 1]?.price || 0;
  const earliestPrice = chartData[0]?.price || 0;
  const priceChange = latestPrice - earliestPrice;
  const priceChangePercent = earliestPrice ? ((priceChange / earliestPrice) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* Price History Chart */}
      {selectedProduct && (
        <Card className="border-blue-500/30 bg-blue-500/5">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-blue-300 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Price History - {selectedProduct.name}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="outline" 
                  className={`${priceChange >= 0 ? 'border-red-500/30 text-red-400' : 'border-green-500/30 text-green-400'}`}
                >
                  {priceChange >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {Math.abs(parseFloat(priceChangePercent))}% (30 days)
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingHistory ? (
              <div className="h-64 flex items-center justify-center">
                <div className="text-blue-300">Loading price history...</div>
              </div>
            ) : chartData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#9CA3AF"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      fontSize={12}
                      domain={['dataMin - 5', 'dataMax + 5']}
                      tickFormatter={(value) => `£${value}`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F3F4F6'
                      }}
                      labelFormatter={(label, payload) => {
                        const data = payload?.[0]?.payload;
                        return data ? new Date(data.fullDate).toLocaleDateString('en-GB') : label;
                      }}
                      formatter={(value: any, name) => [
                        `£${value}`,
                        name === 'price' ? 'Average Price' : name
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                No price history available
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Seasonal Patterns */}
      {seasonalPatterns && (
        <Card className="border-orange-500/30 bg-orange-500/5">
          <CardHeader>
            <CardTitle className="text-orange-300 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Seasonal Pricing Patterns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {Object.entries(seasonalPatterns.patterns).map(([season, data]: [string, any]) => (
                <div key={season} className="text-center p-3 bg-orange-500/10 rounded-lg">
                  <h4 className="font-medium text-orange-200 capitalize">{season}</h4>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    {data.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-red-400" />
                    ) : data.trend === 'down' ? (
                      <TrendingDown className="h-4 w-4 text-green-400" />
                    ) : (
                      <div className="h-4 w-4" />
                    )}
                    <span className={`text-sm font-medium ${
                      data.trend === 'up' ? 'text-red-400' : 
                      data.trend === 'down' ? 'text-green-400' : 'text-orange-200'
                    }`}>
                      {data.change}
                    </span>
                  </div>
                  <p className="text-xs text-orange-300 mt-1">{data.reason}</p>
                </div>
              ))}
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="h-4 w-4 text-orange-400" />
                <span className="font-medium text-orange-300">Current Season: {seasonalPatterns.currentSeason}</span>
              </div>
              <p className="text-sm text-orange-200">{seasonalPatterns.recommendation}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Price Alerts */}
      <Card className="border-yellow-500/30 bg-yellow-500/5">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-yellow-300 flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Price Alerts
            </CardTitle>
            <Button 
              onClick={() => setShowCreateAlert(!showCreateAlert)}
              size="sm"
              className="bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30"
            >
              {showCreateAlert ? <BellOff className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
              {showCreateAlert ? 'Cancel' : 'Create Alert'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showCreateAlert && selectedProduct && (
            <div className="bg-yellow-500/10 rounded-lg p-4 mb-4 space-y-3">
              <h4 className="font-medium text-yellow-300">Create Price Alert for {selectedProduct.name}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-yellow-200">Target Price (£)</label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={alertForm.targetPrice}
                    onChange={(e) => setAlertForm(prev => ({ ...prev, targetPrice: e.target.value }))}
                    className="bg-elec-dark border-yellow-500/30 text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-yellow-200">Alert Type</label>
                  <Select value={alertForm.alertType} onValueChange={(value: any) => setAlertForm(prev => ({ ...prev, alertType: value }))}>
                    <SelectTrigger className="bg-elec-dark border-yellow-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-yellow-500/30 z-50">
                      <SelectItem value="below" className="text-white">Price drops below</SelectItem>
                      <SelectItem value="above" className="text-white">Price rises above</SelectItem>
                      <SelectItem value="change" className="text-white">Any price change</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs text-yellow-200">Supplier</label>
                  <Select value={alertForm.supplier} onValueChange={(value) => setAlertForm(prev => ({ ...prev, supplier: value }))}>
                    <SelectTrigger className="bg-elec-dark border-yellow-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-yellow-500/30 z-50">
                      <SelectItem value="Any" className="text-white">Any Supplier</SelectItem>
                      <SelectItem value="Screwfix" className="text-white">Screwfix</SelectItem>
                      <SelectItem value="CEF" className="text-white">CEF</SelectItem>
                      <SelectItem value="RS Components" className="text-white">RS Components</SelectItem>
                      <SelectItem value="Toolstation" className="text-white">Toolstation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button 
                onClick={createPriceAlert}
                disabled={!alertForm.targetPrice}
                className="bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30"
              >
                Create Alert
              </Button>
            </div>
          )}

          {/* Active Alerts */}
          <div className="space-y-2">
            {isLoadingAlerts ? (
              <div className="text-yellow-300">Loading alerts...</div>
            ) : userAlerts.length > 0 ? (
              userAlerts.map(alert => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div>
                    <h5 className="font-medium text-yellow-200">{alert.productName}</h5>
                    <p className="text-xs text-yellow-300">
                      Alert when price goes {alert.alertType} £{alert.targetPrice} 
                      {alert.supplier && ` (${alert.supplier})`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Current: £{alert.currentPrice} • Created: {new Date(alert.createdAt!).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${alert.isActive ? 'border-green-500/30 text-green-400' : 'border-gray-500/30 text-gray-400'}`}
                  >
                    {alert.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No price alerts set. Create one to get notified of price changes.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceHistoryAlerts;