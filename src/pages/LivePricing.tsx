
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PoundSterling, TrendingUp, TrendingDown, Minus } from "lucide-react";
import BackButton from "@/components/common/BackButton";

const LivePricing = () => {
  const pricingData = [
    {
      material: "Twin & Earth 2.5mm²",
      currentPrice: "£89.50",
      change: "+2.3%",
      trend: "up",
      supplier: "Various"
    },
    {
      material: "SWA 3 Core 2.5mm²",
      currentPrice: "£125.00",
      change: "-1.5%",
      trend: "down",
      supplier: "Various"
    },
    {
      material: "Standard MCB 32A",
      currentPrice: "£12.50",
      change: "0%",
      trend: "stable",
      supplier: "Various"
    },
    {
      material: "RCD 30mA 63A",
      currentPrice: "£45.00",
      change: "+0.8%",
      trend: "up",
      supplier: "Various"
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-500";
      case "down":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <Helmet>
        <title>Live Pricing - Elec-Mate</title>
        <meta name="description" content="Real-time pricing updates for materials and services" />
      </Helmet>
      
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Live Pricing</h1>
            <p className="text-muted-foreground">
              Real-time pricing updates for materials and services
            </p>
          </div>
          <BackButton customUrl="/electrician" label="Back to Electrical Hub" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pricingData.map((item, index) => (
            <Card key={index} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{item.material}</span>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(item.trend)}
                    <span className={getTrendColor(item.trend)}>{item.change}</span>
                  </div>
                </CardTitle>
                <CardDescription>{item.supplier}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <PoundSterling className="h-5 w-5 text-elec-yellow" />
                  <span className="text-2xl font-bold text-elec-yellow">{item.currentPrice}</span>
                  <span className="text-sm text-gray-400">per 100m</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center p-8">
          <p className="text-gray-400">Live pricing data updates every 15 minutes</p>
          <p className="text-sm text-gray-500 mt-2">Prices are indicative and may vary by supplier and quantity</p>
        </div>
      </div>
    </div>
  );
};

export default LivePricing;
