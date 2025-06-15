
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Users, MapPin, Zap, AlertTriangle, Target } from "lucide-react";

const MarketIntelligenceTab = () => {
  const marketData = [
    {
      metric: "Average Hourly Rate",
      value: "£45-65",
      trend: "up",
      description: "UK average for qualified electricians"
    },
    {
      metric: "Market Growth",
      value: "8.3%",
      trend: "up",
      description: "Annual growth in electrical services sector"
    },
    {
      metric: "New Business Survival",
      value: "87%",
      trend: "stable",
      description: "Percentage surviving first 12 months"
    },
    {
      metric: "Average Startup Cost",
      value: "£15-25k",
      trend: "up",
      description: "Including tools, vehicle, and setup costs"
    }
  ];

  const regionalData = [
    {
      region: "London & South East",
      hourlyRate: "£55-75",
      demand: "Very High",
      competition: "High",
      opportunities: ["Smart home installations", "EV charging points", "Commercial retrofits"]
    },
    {
      region: "North West",
      hourlyRate: "£40-55",
      demand: "High", 
      competition: "Medium",
      opportunities: ["Industrial maintenance", "New build developments", "Renewable energy"]
    },
    {
      region: "Scotland",
      hourlyRate: "£42-58",
      demand: "Medium",
      competition: "Low",
      opportunities: ["Rural electrification", "Offshore wind projects", "Tourism sector"]
    },
    {
      region: "Wales",
      hourlyRate: "£38-52",
      demand: "Medium",
      competition: "Low",
      opportunities: ["Housing developments", "Agricultural installations", "Tourism infrastructure"]
    }
  ];

  const growthSectors = [
    {
      sector: "Electric Vehicle Charging",
      growth: "45%",
      description: "Rapid expansion in home and commercial EV charging installations",
      requirements: ["EV charging qualification", "DNO application knowledge", "Smart systems understanding"]
    },
    {
      sector: "Smart Home Technology",
      growth: "38%",
      description: "Increasing demand for home automation and smart electrical systems",
      requirements: ["Smart device installation", "Network configuration", "Customer education skills"]
    },
    {
      sector: "Renewable Energy",
      growth: "32%",
      description: "Solar PV, battery storage, and grid integration projects",
      requirements: ["MCS certification", "DNO procedures", "Energy storage systems knowledge"]
    },
    {
      sector: "Commercial Retrofits",
      growth: "28%",
      description: "Energy efficiency upgrades and LED conversion projects",
      requirements: ["Commercial experience", "Energy assessment", "Project management"]
    }
  ];

  const competitorAnalysis = [
    {
      type: "Large National Companies",
      market_share: "35%",
      strengths: ["Brand recognition", "Resources", "National coverage"],
      weaknesses: ["Higher prices", "Less personal service", "Slower response times"],
      strategy: "Focus on personal service and local expertise"
    },
    {
      type: "Regional Contractors",
      market_share: "40%",
      strengths: ["Local knowledge", "Established relationships", "Experience"],
      weaknesses: ["Limited availability", "Traditional methods", "Higher overheads"],
      strategy: "Compete on price, technology adoption, and availability"
    },
    {
      type: "Sole Traders",
      market_share: "25%",
      strengths: ["Low prices", "Flexibility", "Personal service"],
      weaknesses: ["Limited capacity", "Basic marketing", "Inconsistent quality"],
      strategy: "Differentiate through professionalism and reliability"
    }
  ];

  const customerSegments = [
    {
      segment: "Domestic Homeowners",
      size: "45%",
      avg_job_value: "£150-500",
      characteristics: ["Price sensitive", "Quality focused", "Referral driven"],
      best_approach: "Local marketing, testimonials, competitive pricing"
    },
    {
      segment: "Small Businesses",
      size: "30%",
      avg_job_value: "£300-1500",
      characteristics: ["Reliability focused", "Time sensitive", "Relationship based"],
      best_approach: "Professional presentation, quick response, maintenance contracts"
    },
    {
      segment: "Property Developers",
      size: "15%",
      avg_job_value: "£2000-10000",
      characteristics: ["Cost focused", "Schedule driven", "Volume based"],
      best_approach: "Competitive tendering, capacity demonstration, reliability"
    },
    {
      segment: "Landlords & Property Managers",
      size: "10%",
      avg_job_value: "£200-800",
      characteristics: ["Compliance focused", "Emergency response", "Regular work"],
      best_approach: "Certification expertise, 24/7 availability, maintenance contracts"
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'down': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default: return <Target className="h-4 w-4 text-blue-400" />;
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Very High': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'High': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-blue-500/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            UK Electrical Services Market Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {marketData.map((data, index) => (
              <div key={index} className="text-center p-4 bg-elec-dark/50 rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-2">
                  {getTrendIcon(data.trend)}
                  <div className="text-xl font-bold text-white">{data.value}</div>
                </div>
                <div className="text-sm font-medium text-elec-yellow">{data.metric}</div>
                <div className="text-xs text-muted-foreground mt-1">{data.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Regional Market Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {regionalData.map((region, index) => (
              <div key={index} className="border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-medium text-white">{region.region}</h4>
                  <div className="flex gap-2">
                    <Badge className={getDemandColor(region.demand)}>
                      {region.demand} Demand
                    </Badge>
                    <Badge variant="outline" className="text-blue-300 border-blue-400/30">
                      {region.hourlyRate}
                    </Badge>
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground">Competition: {region.competition}</span>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-blue-200 mb-1">Key Opportunities:</h5>
                  <div className="flex flex-wrap gap-1">
                    {region.opportunities.map((opportunity, oppIndex) => (
                      <Badge key={oppIndex} variant="secondary" className="text-xs">
                        {opportunity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            High-Growth Sectors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {growthSectors.map((sector, index) => (
              <div key={index} className="border border-green-500/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-white">{sector.sector}</h4>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    +{sector.growth} growth
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{sector.description}</p>
                <div>
                  <h5 className="text-sm font-medium text-green-200 mb-1">Required Skills:</h5>
                  <div className="flex flex-wrap gap-1">
                    {sector.requirements.map((requirement, reqIndex) => (
                      <Badge key={reqIndex} variant="outline" className="text-green-300 border-green-400/30 text-xs">
                        {requirement}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-purple-500/50 bg-purple-500/10">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Competitor Landscape
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {competitorAnalysis.map((competitor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-white">{competitor.type}</h4>
                    <Badge variant="outline" className="text-purple-300 border-purple-400/30">
                      {competitor.market_share}
                    </Badge>
                  </div>
                  <div className="text-xs">
                    <div className="text-green-300 mb-1">
                      Strengths: {competitor.strengths.join(", ")}
                    </div>
                    <div className="text-red-300 mb-1">
                      Weaknesses: {competitor.weaknesses.join(", ")}
                    </div>
                    <div className="text-purple-200">
                      Strategy: {competitor.strategy}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-500/50 bg-amber-500/10">
          <CardHeader>
            <CardTitle className="text-amber-300 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Customer Segments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerSegments.map((segment, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-white">{segment.segment}</h4>
                    <div className="text-right">
                      <Badge variant="outline" className="text-amber-300 border-amber-400/30">
                        {segment.size}
                      </Badge>
                      <div className="text-xs text-amber-200 mt-1">{segment.avg_job_value}</div>
                    </div>
                  </div>
                  <div className="text-xs">
                    <div className="text-muted-foreground mb-1">
                      {segment.characteristics.join(", ")}
                    </div>
                    <div className="text-amber-200">
                      {segment.best_approach}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketIntelligenceTab;
