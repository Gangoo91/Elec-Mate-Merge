
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PoundSterling, ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LivePricing = () => {
  const pricingItems = [
    {
      id: 1,
      name: "Copper (per tonne)",
      currentPrice: "£7,245.50",
      change: "+2.3%",
      trending: "up"
    },
    {
      id: 2,
      name: "PVC Conduit (20mm)",
      currentPrice: "£1.85/m",
      change: "-0.5%",
      trending: "down"
    },
    {
      id: 3,
      name: "Steel Trunking (100x100mm)",
      currentPrice: "£24.80/m",
      change: "+1.2%",
      trending: "up"
    },
    {
      id: 4,
      name: "Twin & Earth 2.5mm²",
      currentPrice: "£0.92/m",
      change: "+4.5%",
      trending: "up"
    },
    {
      id: 5,
      name: "Consumer Units (Average)",
      currentPrice: "£85.30",
      change: "-1.8%",
      trending: "down"
    },
    {
      id: 6,
      name: "LED Panel Lights (600x600mm)",
      currentPrice: "£28.99",
      change: "-2.5%",
      trending: "down"
    },
    {
      id: 7,
      name: "Contractor Day Rate (Average)",
      currentPrice: "£265.00",
      change: "+1.5%",
      trending: "up"
    },
    {
      id: 8,
      name: "Armoured Cable 10mm² (SWA)",
      currentPrice: "£4.75/m",
      change: "+3.2%",
      trending: "up"
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <PoundSterling className="h-8 w-8 text-elec-yellow" />
            Live Pricing
          </h1>
          <p className="text-muted-foreground">
            Real-time pricing updates for materials and services
          </p>
        </div>
        <Link to="/electrician/toolbox-talk">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Toolbox Talk
          </Button>
        </Link>
      </div>

      <div className="border p-4 rounded-lg bg-elec-gray border-elec-yellow/20 mb-6">
        <h2 className="text-xl font-medium mb-2">Market Overview</h2>
        <p className="mb-4">
          Current pricing data from major UK electrical wholesalers and material markets.
          Updated hourly to reflect the latest changes in material costs and labor rates.
        </p>
        <div className="text-sm text-muted-foreground">Last updated: 4 May 2025, 10:30 AM</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingItems.map(item => (
          <Card key={item.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-0">
              <CardTitle className="text-base">{item.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{item.currentPrice}</span>
                <span className={`flex items-center px-2 py-1 rounded text-sm ${
                  item.trending === "up" 
                    ? "text-green-500" 
                    : "text-red-500"
                }`}>
                  {item.trending === "up" 
                    ? <TrendingUp className="h-4 w-4 mr-1" /> 
                    : <TrendingDown className="h-4 w-4 mr-1" />
                  }
                  {item.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button className="px-8">View Full Price List</Button>
      </div>
    </div>
  );
};

export default LivePricing;
