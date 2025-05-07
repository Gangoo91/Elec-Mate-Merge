
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PricingItem {
  id: number;
  name: string;
  currentPrice: string;
  change: string;
  trending: "up" | "down" | "neutral";
}

const ToolPricingWidget = () => {
  const [pricingData, setPricingData] = useState<PricingItem[]>([
    {
      id: 1,
      name: "Electric Test Meters",
      currentPrice: "£89.50",
      change: "-2.5%",
      trending: "down"
    },
    {
      id: 2,
      name: "Cordless Drills",
      currentPrice: "£122.75",
      change: "+3.8%",
      trending: "up"
    },
    {
      id: 3,
      name: "Hand Tools (Avg)",
      currentPrice: "£28.99",
      change: "-1.2%",
      trending: "down"
    }
  ]);

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center justify-between">
          Tool Price Tracker
          <span className="text-xs bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded">LIVE</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pricingData.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b border-elec-yellow/10 pb-2">
              <span className="text-sm">{item.name}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{item.currentPrice}</span>
                <span className={`flex items-center text-xs px-1 py-0.5 rounded ${
                  item.trending === "up" 
                    ? "text-green-500" 
                    : "text-red-500"
                }`}>
                  {item.trending === "up" 
                    ? <TrendingUp className="h-3 w-3 mr-0.5" /> 
                    : <TrendingDown className="h-3 w-3 mr-0.5" />
                  }
                  {item.change}
                </span>
              </div>
            </div>
          ))}
          <Link to="/electrician/tools-price-tracker" className="block mt-4">
            <Button variant="outline" size="sm" className="w-full">View Full Price List</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolPricingWidget;
