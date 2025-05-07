
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PricingItem {
  id: number;
  name: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

const LivePricingWidget = () => {
  const [pricingData, setPricingData] = useState<PricingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMetalPrices = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-metal-prices');
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Take a few key items from each category
      const keyItems: PricingItem[] = [
        data.metalPrices[0], // First metal (Copper)
        data.cablePrices[0], // First cable (Twin & Earth)
        data.equipmentPrices[0], // First equipment (Consumer Units)
      ];
      
      setPricingData(keyItems);
    } catch (error) {
      console.error("Error fetching prices for widget:", error);
      // Set fallback data if API fails
      setPricingData([
        {
          id: 1,
          name: "Copper (per kg)",
          value: "£7.25",
          change: "+2.3%",
          trend: "up"
        },
        {
          id: 2,
          name: "Twin & Earth 2.5mm²",
          value: "£0.92/m",
          change: "+4.5%",
          trend: "up"
        },
        {
          id: 3,
          name: "Consumer Units (Avg)",
          value: "£85.30",
          change: "-1.8%",
          trend: "down"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetalPrices();
  }, []);

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray h-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Live Material Pricing</CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded">LIVE</span>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-6 w-6"
            onClick={fetchMetalPrices}
            disabled={isLoading}
          >
            <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center border-b border-elec-yellow/10 pb-2">
                  <div className="h-4 w-24 bg-elec-yellow/10 rounded animate-pulse" />
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-16 bg-elec-yellow/10 rounded animate-pulse" />
                    <div className="h-4 w-10 bg-elec-yellow/10 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            pricingData.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b border-elec-yellow/10 pb-2">
                <span className="text-sm">{item.name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.value}</span>
                  <span className={`flex items-center text-xs px-1 py-0.5 rounded ${
                    item.trend === "up" 
                      ? "text-green-500" 
                      : "text-red-500"
                  }`}>
                    {item.trend === "up" 
                      ? <TrendingUp className="h-3 w-3 mr-0.5" /> 
                      : <TrendingDown className="h-3 w-3 mr-0.5" />
                    }
                    {item.change}
                  </span>
                </div>
              </div>
            ))
          )}
          <Link to="/electrician/live-pricing" className="block mt-4">
            <Button variant="outline" size="sm" className="w-full">View Full Price List</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default LivePricingWidget;
