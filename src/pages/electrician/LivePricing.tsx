
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PoundSterling, ArrowLeft, RefreshCw } from "lucide-react";
import LivePricingMetricsCard from "@/components/electrician-pricing/LivePricingMetricsCard";
import ScrapPriceTable from "@/components/electrician-pricing/ScrapPriceTable";
import MarketAlerts from "@/components/electrician-pricing/MarketAlerts";
import { useToast } from "@/hooks/use-toast";

const LivePricing = () => {
  const { toast } = useToast();
  const [lastUpdated, setLastUpdated] = useState("7 May 2025, 10:30 AM");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const metalPrices = [
    {
      id: 1,
      name: "Copper (per kg)",
      value: "£7.25",
      change: "+2.3%",
      trend: "up" as const,
    },
    {
      id: 2,
      name: "Aluminium (per kg)",
      value: "£2.19",
      change: "-0.8%",
      trend: "down" as const,
    },
    {
      id: 3,
      name: "Steel (per kg)",
      value: "£0.68",
      change: "+0.5%",
      trend: "up" as const,
    },
    {
      id: 4,
      name: "Brass (per kg)",
      value: "£5.12",
      change: "-1.2%",
      trend: "down" as const,
    }
  ];

  const cableMetrics = [
    {
      id: 1,
      name: "Twin & Earth 2.5mm²",
      value: "£0.92/m",
      change: "+4.5%",
      trend: "up" as const,
    },
    {
      id: 2,
      name: "Armoured Cable 10mm² (SWA)",
      value: "£4.75/m",
      change: "+3.2%",
      trend: "up" as const,
    },
    {
      id: 3,
      name: "PVC Conduit (20mm)",
      value: "£1.85/m",
      change: "-0.5%",
      trend: "down" as const,
    },
    {
      id: 4,
      name: "Fire Resistant Cable 1.5mm²",
      value: "£1.25/m",
      change: "+2.1%",
      trend: "up" as const,
    }
  ];

  const equipmentPrices = [
    {
      id: 1,
      name: "Consumer Units (Average)",
      value: "£85.30",
      change: "-1.8%",
      trend: "down" as const,
    },
    {
      id: 2,
      name: "LED Panel Lights (600x600mm)",
      value: "£28.99",
      change: "-2.5%",
      trend: "down" as const,
    },
    {
      id: 3,
      name: "Steel Trunking (100x100mm)",
      value: "£24.80/m",
      change: "+1.2%",
      trend: "up" as const,
    },
    {
      id: 4,
      name: "Circuit Breakers (MCB)",
      value: "£8.45",
      change: "+0.7%",
      trend: "up" as const,
    }
  ];

  const scrapMetalPrices = [
    {
      id: 1,
      material: "Copper Wire (Clean)",
      price: "£5.20",
      change: "+3.5%",
      trend: "up" as const,
      unit: "per kg"
    },
    {
      id: 2,
      material: "Copper Wire (Insulated)",
      price: "£2.80",
      change: "+2.2%",
      trend: "up" as const,
      unit: "per kg"
    },
    {
      id: 3,
      material: "Brass",
      price: "£3.60",
      change: "-0.5%",
      trend: "down" as const,
      unit: "per kg"
    },
    {
      id: 4,
      material: "Aluminium Cable",
      price: "£1.40",
      change: "+1.0%",
      trend: "up" as const,
      unit: "per kg"
    },
    {
      id: 5,
      material: "Lead",
      price: "£1.25",
      change: "-0.8%",
      trend: "down" as const,
      unit: "per kg"
    },
    {
      id: 6,
      material: "Steel",
      price: "£0.18",
      change: "+0.2%",
      trend: "up" as const,
      unit: "per kg"
    }
  ];

  const marketAlerts = [
    {
      id: 1,
      message: "Copper prices expected to rise further due to mining disruptions in Chile.",
      date: "7 May 2025",
      type: "info" as const
    },
    {
      id: 2,
      message: "Global shortages of semiconductor components affecting smart electrical equipment pricing.",
      date: "5 May 2025",
      type: "warning" as const
    },
    {
      id: 3,
      message: "New tariffs expected on Chinese electrical components from next month.",
      date: "3 May 2025",
      type: "warning" as const
    }
  ];

  const refreshPrices = () => {
    setIsRefreshing(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      const now = new Date();
      const formattedDate = `${now.getDate()} ${now.toLocaleString('default', { month: 'short' })} ${now.getFullYear()}, ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
      setLastUpdated(formattedDate);
      setIsRefreshing(false);
      
      toast({
        title: "Prices Updated",
        description: "Latest material pricing data has been loaded",
      });
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <PoundSterling className="h-8 w-8 text-elec-yellow" />
          Live Pricing
        </h1>
        
        <div className="flex items-center gap-2">
          <Link to="/electrician/toolbox-talk">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={refreshPrices}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="border p-4 rounded-lg bg-elec-gray border-elec-yellow/20 flex flex-col sm:flex-row items-center justify-between gap-2">
        <h2 className="text-xl font-medium">Material Market Prices</h2>
        <div className="text-sm text-muted-foreground">Last updated: {lastUpdated}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LivePricingMetricsCard title="Metal Prices" metrics={metalPrices} />
        <LivePricingMetricsCard title="Cable Prices" metrics={cableMetrics} />
        <LivePricingMetricsCard title="Equipment Prices" metrics={equipmentPrices} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MarketAlerts alerts={marketAlerts} />
        <ScrapPriceTable items={scrapMetalPrices} />
      </div>
      
      <div className="border p-4 rounded-lg bg-elec-gray border-elec-yellow/20">
        <h2 className="text-lg font-medium mb-2">Price Information Disclaimer</h2>
        <p className="text-sm text-muted-foreground">
          Prices shown are indicative only and may vary by supplier and region. Always confirm current
          prices with your local supplier before making purchasing decisions. Market data is provided
          for informational purposes only and should not be considered as financial advice.
        </p>
      </div>
    </div>
  );
};

export default LivePricing;
