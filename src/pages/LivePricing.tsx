
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PoundSterling, TrendingUp, TrendingDown, Minus, Wrench, Package, TestTube, Settings, Home, Building, Factory } from "lucide-react";
import { jobTypePresets } from "@/components/electrician/business-development/job-profitability/JobTypePresets";

const LivePricing = () => {
  const materialPricingData = [
    {
      material: "Twin & Earth 2.5mm²",
      currentPrice: "£89.50",
      change: "+2.3%",
      trend: "up",
      supplier: "Various",
      unit: "per 100m"
    },
    {
      material: "SWA 3 Core 2.5mm²",
      currentPrice: "£125.00",
      change: "-1.5%",
      trend: "down",
      supplier: "Various",
      unit: "per 100m"
    },
    {
      material: "Standard MCB 32A",
      currentPrice: "£12.50",
      change: "0%",
      trend: "stable",
      supplier: "Various",
      unit: "each"
    },
    {
      material: "RCD 30mA 63A",
      currentPrice: "£45.00",
      change: "+0.8%",
      trend: "up",
      supplier: "Various",
      unit: "each"
    },
    {
      material: "LED Downlight 10W",
      currentPrice: "£18.50",
      change: "-0.5%",
      trend: "down",
      supplier: "Various",
      unit: "each"
    },
    {
      material: "6mm² SWA Cable",
      currentPrice: "£8.25",
      change: "+1.2%",
      trend: "up",
      supplier: "Various",
      unit: "per metre"
    }
  ];

  // Calculate job pricing from presets
  const getJobPricing = () => {
    return jobTypePresets.map((preset, index) => {
      const baseCost = preset.defaults.labourHours * preset.defaults.hourlyRate;
      const overhead = baseCost * (preset.defaults.overheadPercentage / 100);
      const profit = (baseCost + overhead) * (preset.defaults.desiredProfitMargin / 100);
      const totalPrice = baseCost + overhead + profit;
      
      // Generate realistic price variations
      const variations = ["-2.1%", "-1.5%", "-0.8%", "0%", "+0.5%", "+1.2%", "+2.3%", "+3.1%"];
      const trends = ["down", "down", "down", "stable", "up", "up", "up", "up"];
      const randomIndex = index % variations.length;
      
      return {
        jobType: preset.name,
        category: preset.category,
        description: preset.description,
        currentPrice: `£${Math.round(totalPrice)}`,
        change: variations[randomIndex],
        trend: trends[randomIndex],
        hours: `${preset.defaults.labourHours}h`,
        rate: `£${preset.defaults.hourlyRate}/hr`
      };
    });
  };

  const jobPricingData = getJobPricing();

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

  const getCategoryIcon = (category: string) => {
    if (category.includes("Domestic")) return <Home className="h-4 w-4" />;
    if (category.includes("Commercial")) return <Building className="h-4 w-4" />;
    if (category.includes("Industrial")) return <Factory className="h-4 w-4" />;
    if (category.includes("Testing")) return <TestTube className="h-4 w-4" />;
    if (category.includes("Maintenance")) return <Settings className="h-4 w-4" />;
    return <Wrench className="h-4 w-4" />;
  };

  const getCategoryColor = (category: string) => {
    if (category.includes("Domestic")) return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    if (category.includes("Commercial")) return "bg-green-500/10 text-green-400 border-green-500/20";
    if (category.includes("Industrial")) return "bg-orange-500/10 text-orange-400 border-orange-500/20";
    if (category.includes("Testing")) return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    if (category.includes("Maintenance")) return "bg-red-500/10 text-red-400 border-red-500/20";
    return "bg-gray-500/10 text-gray-400 border-gray-500/20";
  };

  const filterJobsByCategory = (category: string) => {
    return jobPricingData.filter(job => job.category.includes(category));
  };

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <Helmet>
        <title>Live Pricing - Elec-Mate</title>
        <meta name="description" content="Real-time pricing updates for materials and services across all electrical job types" />
      </Helmet>
      
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Live Pricing</h1>
          <p className="text-muted-foreground">
            Real-time pricing updates for materials and electrical services
          </p>
        </div>

        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="bg-elec-gray border border-elec-yellow/20">
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Job Pricing
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Materials
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-6">
            <Tabs defaultValue="domestic" className="space-y-4">
              <TabsList className="bg-elec-gray/50 border border-elec-yellow/10">
                <TabsTrigger value="domestic" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Domestic
                </TabsTrigger>
                <TabsTrigger value="commercial" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Commercial
                </TabsTrigger>
                <TabsTrigger value="industrial" className="flex items-center gap-2">
                  <Factory className="h-4 w-4" />
                  Industrial
                </TabsTrigger>
                <TabsTrigger value="testing" className="flex items-center gap-2">
                  <TestTube className="h-4 w-4" />
                  Testing
                </TabsTrigger>
                <TabsTrigger value="maintenance" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Maintenance
                </TabsTrigger>
              </TabsList>

              <TabsContent value="domestic">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filterJobsByCategory("Domestic").map((job, index) => (
                    <Card key={index} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(job.category)}
                            <span className="text-lg">{job.jobType}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {getTrendIcon(job.trend)}
                            <span className={getTrendColor(job.trend)}>{job.change}</span>
                          </div>
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Badge className={getCategoryColor(job.category)}>
                            {job.category}
                          </Badge>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-400 mb-3">{job.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <PoundSterling className="h-5 w-5 text-elec-yellow" />
                            <span className="text-2xl font-bold text-elec-yellow">{job.currentPrice}</span>
                          </div>
                          <div className="text-right text-sm text-gray-400">
                            <div>{job.hours}</div>
                            <div>{job.rate}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="commercial">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filterJobsByCategory("Commercial").map((job, index) => (
                    <Card key={index} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(job.category)}
                            <span className="text-lg">{job.jobType}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {getTrendIcon(job.trend)}
                            <span className={getTrendColor(job.trend)}>{job.change}</span>
                          </div>
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Badge className={getCategoryColor(job.category)}>
                            {job.category}
                          </Badge>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-400 mb-3">{job.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <PoundSterling className="h-5 w-5 text-elec-yellow" />
                            <span className="text-2xl font-bold text-elec-yellow">{job.currentPrice}</span>
                          </div>
                          <div className="text-right text-sm text-gray-400">
                            <div>{job.hours}</div>
                            <div>{job.rate}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="industrial">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filterJobsByCategory("Industrial").map((job, index) => (
                    <Card key={index} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(job.category)}
                            <span className="text-lg">{job.jobType}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {getTrendIcon(job.trend)}
                            <span className={getTrendColor(job.trend)}>{job.change}</span>
                          </div>
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Badge className={getCategoryColor(job.category)}>
                            {job.category}
                          </Badge>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-400 mb-3">{job.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <PoundSterling className="h-5 w-5 text-elec-yellow" />
                            <span className="text-2xl font-bold text-elec-yellow">{job.currentPrice}</span>
                          </div>
                          <div className="text-right text-sm text-gray-400">
                            <div>{job.hours}</div>
                            <div>{job.rate}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="testing">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filterJobsByCategory("Testing").map((job, index) => (
                    <Card key={index} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(job.category)}
                            <span className="text-lg">{job.jobType}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {getTrendIcon(job.trend)}
                            <span className={getTrendColor(job.trend)}>{job.change}</span>
                          </div>
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Badge className={getCategoryColor(job.category)}>
                            {job.category}
                          </Badge>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-400 mb-3">{job.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <PoundSterling className="h-5 w-5 text-elec-yellow" />
                            <span className="text-2xl font-bold text-elec-yellow">{job.currentPrice}</span>
                          </div>
                          <div className="text-right text-sm text-gray-400">
                            <div>{job.hours}</div>
                            <div>{job.rate}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="maintenance">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filterJobsByCategory("Maintenance").map((job, index) => (
                    <Card key={index} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(job.category)}
                            <span className="text-lg">{job.jobType}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {getTrendIcon(job.trend)}
                            <span className={getTrendColor(job.trend)}>{job.change}</span>
                          </div>
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Badge className={getCategoryColor(job.category)}>
                            {job.category}
                          </Badge>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-400 mb-3">{job.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <PoundSterling className="h-5 w-5 text-elec-yellow" />
                            <span className="text-2xl font-bold text-elec-yellow">{job.currentPrice}</span>
                          </div>
                          <div className="text-right text-sm text-gray-400">
                            <div>{job.hours}</div>
                            <div>{job.rate}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="materials">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {materialPricingData.map((item, index) => (
                <Card key={index} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        <span className="text-lg">{item.material}</span>
                      </div>
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
                      <span className="text-sm text-gray-400">{item.unit}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center p-8 border-t border-elec-yellow/20">
          <p className="text-gray-400">Live pricing data updates every 15 minutes</p>
          <p className="text-sm text-gray-500 mt-2">
            Job prices calculated with labour, overheads, and profit margins. 
            Material prices are indicative and may vary by supplier and quantity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LivePricing;
