
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
      
      // Take more key metals to display, including different copper types
      const keyItems: PricingItem[] = [
        data.metalPrices[0], // Copper - Bright
        data.metalPrices[1], // Copper - Clean
        data.metalPrices[2], // Copper - Mixed
        data.metalPrices[4], // Aluminium
        data.metalPrices[5], // Brass
        data.metalPrices[7], // Steel
      ];
      
      setPricingData(keyItems);
    } catch (error) {
      console.error("Error fetching prices for widget:", error);
      // Set fallback data if API fails
      setPricingData([
        {
          id: 1,
          name: "Copper - Bright (per kg)",
          value: "£7.75",
          change: "+2.3%",
          trend: "up"
        },
        {
          id: 2,
          name: "Copper - Clean (per kg)",
          value: "£7.25",
          change: "+1.8%",
          trend: "up"
        },
        {
          id: 3,
          name: "Copper - Mixed (per kg)",
          value: "£6.85",
          change: "+1.2%",
          trend: "up"
        },
        {
          id: 5,
          name: "Aluminium (per kg)",
          value: "£2.19",
          change: "+1.5%",
          trend: "up"
        },
        {
          id: 6,
          name: "Brass (per kg)",
          value: "£5.12",
          change: "+0.8%",
          trend: "up"
        },
        {
          id: 8,
          name: "Steel (per kg)",
          value: "£0.68",
          change: "-0.3%",
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
              {[1, 2, 3, 4, 5, 6].map((i) => (
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
                <div className="flex items-center">
                  <span className="font-medium w-16 text-right">{item.value}</span>
                  <span className={`flex items-center text-xs px-1 py-0.5 rounded w-14 justify-end ${
                    item.trend === "up" 
                      ? "text-green-500" 
                      : item.trend === "down"
                        ? "text-red-500"
                        : "text-gray-400"
                  }`}>
                    {item.trend === "up" 
                      ? <TrendingUp className="h-3 w-3 mr-0.5" /> 
                      : item.trend === "down"
                        ? <TrendingDown className="h-3 w-3 mr-0.5" />
                        : null
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
