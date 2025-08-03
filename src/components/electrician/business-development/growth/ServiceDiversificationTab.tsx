import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, Zap, Home, Building, Car, Sun } from "lucide-react";

export const ServiceDiversificationTab = () => {
  const serviceCategories = [
    {
      category: "Smart Home Technology",
      icon: <Home className="h-5 w-5" />,
      demand: "Very High",
      profitability: "High",
      complexity: "Medium",
      services: ["Smart lighting systems", "Home automation", "Security system wiring", "Smart meter installations"],
      investment: "£2,000-5,000 for training and initial equipment",
      growth: "Growing rapidly with increasing demand for smart homes"
    },
    {
      category: "EV Charging Points",
      icon: <Car className="h-5 w-5" />,
      demand: "Very High",
      profitability: "High",
      complexity: "Medium",
      services: ["Home EV charger installation", "Commercial charging points", "EV infrastructure", "Government grant schemes"],
      investment: "£1,500-3,000 for OZEV approval and equipment",
      growth: "Booming market with government support until 2030"
    },
    {
      category: "Solar & Renewable Energy",
      icon: <Sun className="h-5 w-5" />,
      demand: "High",
      profitability: "Very High",
      complexity: "High",
      services: ["Solar panel installation", "Battery storage systems", "Heat pump electrical work", "MCS certification"],
      investment: "£5,000-15,000 for training and MCS registration",
      growth: "Strong growth driven by environmental concerns"
    },
    {
      category: "Commercial Services",
      icon: <Building className="h-5 w-5" />,
      demand: "High",
      profitability: "High",
      complexity: "High",
      services: ["Office fit-outs", "Retail lighting", "Industrial maintenance", "Emergency lighting systems"],
      investment: "£3,000-8,000 for commercial qualifications",
      growth: "Steady demand with higher profit margins"
    },
    {
      category: "Testing & Inspection",
      icon: <Zap className="h-5 w-5" />,
      demand: "Medium",
      profitability: "Medium",
      complexity: "Medium",
      services: ["EICR testing", "PAT testing", "Landlord certificates", "Insurance inspections"],
      investment: "£2,000-4,000 for testing equipment and training",
      growth: "Stable recurring revenue stream"
    },
    {
      category: "Maintenance Contracts",
      icon: <Wrench className="h-5 w-5" />,
      demand: "Medium",
      profitability: "Medium",
      complexity: "Low",
      services: ["Planned maintenance", "Emergency callouts", "Retail chain contracts", "Office building maintenance"],
      investment: "£1,000-2,000 for initial contracts and insurance",
      growth: "Provides steady, predictable income"
    }
  ];

  const marketOpportunities = [
    {
      trend: "Government Green Initiatives",
      opportunity: "Heat pump installations, solar panels, EV chargers",
      timeframe: "Immediate - next 5 years"
    },
    {
      trend: "Smart Home Adoption",
      opportunity: "Home automation, smart lighting, security systems",
      timeframe: "Growing rapidly"
    },
    {
      trend: "Remote Work Infrastructure",
      opportunity: "Home office electrical upgrades, commercial adaptations",
      timeframe: "Ongoing demand"
    },
    {
      trend: "Aging Electrical Infrastructure",
      opportunity: "Rewiring, consumer unit upgrades, safety improvements",
      timeframe: "Continuous demand"
    }
  ];

  const riskFactors = [
    "Overextending into too many specialisms",
    "Insufficient training leading to poor quality work",
    "High initial investment with uncertain returns",
    "Regulatory changes affecting new markets",
    "Increased competition in popular specialisms"
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-elec-yellow" />
            Service Diversification Opportunities
          </CardTitle>
          <CardDescription>
            Expand your electrical business with high-demand specialisations for 2025
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {serviceCategories.map((category, index) => (
              <Card key={index} className="bg-elec-gray/30">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {category.icon}
                      {category.category}
                    </CardTitle>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant={category.demand === "Very High" ? "destructive" : category.demand === "High" ? "default" : "secondary"}>
                        Demand: {category.demand}
                      </Badge>
                      <Badge variant={category.profitability === "Very High" ? "destructive" : category.profitability === "High" ? "default" : "secondary"}>
                        Profit: {category.profitability}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h5 className="font-medium mb-2">Services Include:</h5>
                    <div className="grid gap-2 md:grid-cols-2">
                      {category.services.map((service, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full" />
                          <span className="text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h5 className="font-medium text-sm text-elec-yellow">Investment Required</h5>
                      <p className="text-sm text-muted-foreground">{category.investment}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm text-elec-yellow">Market Outlook</h5>
                      <p className="text-sm text-muted-foreground">{category.growth}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-elec-yellow" />
            Market Opportunities & Trends
          </CardTitle>
          <CardDescription>
            Key market trends creating opportunities for electrical contractors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketOpportunities.map((opportunity, index) => (
              <div key={index} className="p-4 bg-elec-gray/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{opportunity.trend}</h4>
                  <Badge variant="outline">{opportunity.timeframe}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{opportunity.opportunity}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Revenue Potential (UK Market 2025)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-elec-gray/20 rounded-lg text-center">
              <h4 className="font-medium">EV Charger Installation</h4>
              <p className="text-2xl font-bold text-elec-yellow">£500-1,500</p>
              <p className="text-xs text-muted-foreground">per installation</p>
            </div>
            <div className="p-4 bg-elec-gray/20 rounded-lg text-center">
              <h4 className="font-medium">Smart Home Setup</h4>
              <p className="text-2xl font-bold text-elec-yellow">£800-3,000</p>
              <p className="text-xs text-muted-foreground">per project</p>
            </div>
            <div className="p-4 bg-elec-gray/20 rounded-lg text-center">
              <h4 className="font-medium">Solar Installation</h4>
              <p className="text-2xl font-bold text-elec-yellow">£1,000-5,000</p>
              <p className="text-xs text-muted-foreground">per system</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-500/20 bg-orange-500/5">
        <CardHeader>
          <CardTitle className="text-lg text-orange-400">Risk Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm font-medium">Consider these risks when diversifying:</p>
            {riskFactors.map((risk, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 shrink-0" />
                <span className="text-sm text-muted-foreground">{risk}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};