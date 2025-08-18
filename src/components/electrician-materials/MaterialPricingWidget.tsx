
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, Bell, ExternalLink } from "lucide-react";
import SafeLink from "@/components/common/SafeLink";

interface PricingItem {
  id: number;
  name: string;
  currentPrice: string;
  previousPrice: string;
  change: string;
  changePercent: number;
  trending: "up" | "down" | "neutral";
  supplier: string;
  availability: "in-stock" | "low-stock" | "pre-order";
}

const MaterialPricingWidget = () => {
  const [pricingData, setPricingData] = useState<PricingItem[]>([
    {
      id: 1,
      name: "Twin & Earth 2.5mm (100m)",
      currentPrice: "£89.50",
      previousPrice: "£87.65",
      change: "+£1.85",
      changePercent: 2.1,
      trending: "up",
      supplier: "CEF",
      availability: "in-stock"
    },
    {
      id: 2,
      name: "18-Way Consumer Unit",
      currentPrice: "£234.75",
      previousPrice: "£239.20",
      change: "-£4.45",
      changePercent: -1.8,
      trending: "down",
      supplier: "Rexel",
      availability: "in-stock"
    },
    {
      id: 3,
      name: "LED Downlight 6W",
      currentPrice: "£18.99",
      previousPrice: "£19.62",
      change: "-£0.63",
      changePercent: -3.2,
      trending: "down",
      supplier: "TLC Direct",
      availability: "low-stock"
    },
    {
      id: 4,
      name: "32A Type B MCB",
      currentPrice: "£12.50",
      previousPrice: "£12.44",
      change: "+£0.06",
      changePercent: 0.5,
      trending: "up",
      supplier: "Screwfix",
      availability: "in-stock"
    },
    {
      id: 5,
      name: "6mm SWA Cable (50m)",
      currentPrice: "£156.80",
      previousPrice: "£152.30",
      change: "+£4.50",
      changePercent: 2.9,
      trending: "up",
      supplier: "Edmundson",
      availability: "pre-order"
    }
  ]);

  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Simulate live price updates
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "in-stock": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "low-stock": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "pre-order": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case "in-stock": return "In Stock";
      case "low-stock": return "Low Stock";
      case "pre-order": return "Pre-Order";
      default: return "Unknown";
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2 text-white">
            <Activity className="h-5 w-5 text-elec-yellow" />
            Live Material Prices
          </CardTitle>
          <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 animate-pulse">
            LIVE
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {pricingData.map((item) => (
          <div key={item.id} className="border border-elec-yellow/10 rounded-lg p-3 bg-elec-dark/30">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-white truncate">{item.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{item.supplier}</span>
                  <Badge className={`text-xs ${getAvailabilityColor(item.availability)}`}>
                    {getAvailabilityText(item.availability)}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{item.currentPrice}</span>
                <span className={`flex items-center text-xs px-2 py-1 rounded ${
                  item.trending === "up" 
                    ? "text-red-400 bg-red-500/20" 
                    : "text-green-400 bg-green-500/20"
                }`}>
                  {item.trending === "up" 
                    ? <TrendingUp className="h-3 w-3 mr-1" /> 
                    : <TrendingDown className="h-3 w-3 mr-1" />
                  }
                  {Math.abs(item.changePercent)}%
                </span>
              </div>
              <Button size="sm" variant="ghost" className="text-xs p-1 h-auto">
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
        
        <div className="border-t border-elec-yellow/20 pt-4 space-y-3">
          <Button variant="outline" size="sm" className="w-full border-elec-yellow/30 text-white hover:bg-elec-yellow/10">
            <Bell className="h-4 w-4 mr-2" />
            Set Price Alerts
          </Button>
          
          <SafeLink to="/electrician/live-pricing" className="block">
            <Button variant="outline" size="sm" className="w-full border-elec-yellow/30 text-white hover:bg-elec-yellow/10">
              View Full Price Tracker
            </Button>
          </SafeLink>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialPricingWidget;
