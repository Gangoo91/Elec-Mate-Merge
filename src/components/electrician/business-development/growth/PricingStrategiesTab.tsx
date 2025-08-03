import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PoundSterling, Calculator, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

export const PricingStrategiesTab = () => {
  const pricingModels = [
    {
      name: "Hourly Rate",
      description: "Charge based on time spent on job",
      pros: ["Simple to calculate", "Flexible for varying job sizes", "Easy to justify to customers"],
      cons: ["Income tied to hours worked", "Efficiency not rewarded", "Harder to scale"],
      ukRates: "£35-65/hour (varies by region and experience)"
    },
    {
      name: "Fixed Price",
      description: "Set price for specific jobs or services",
      pros: ["Predictable income", "Rewards efficiency", "Customer knows exact cost"],
      cons: ["Risk of underestimating", "Need accurate job assessment", "Less flexibility"],
      ukRates: "Based on material costs + labour + profit margin"
    },
    {
      name: "Value-Based",
      description: "Price based on value delivered to customer",
      pros: ["Higher profit potential", "Rewards expertise", "Customer-focused"],
      cons: ["Harder to justify", "Requires strong sales skills", "Market education needed"],
      ukRates: "Premium pricing 20-40% above standard rates"
    }
  ];

  const costFactors = [
    { category: "Labour Costs", items: ["Your hourly rate", "Employee wages", "National Insurance", "Pension contributions"] },
    { category: "Material Costs", items: ["Cables and components", "Tools and equipment", "Transport costs", "Waste allowance"] },
    { category: "Overhead Costs", items: ["Van lease/fuel", "Insurance premiums", "Office expenses", "Marketing costs"] },
    { category: "Profit Margin", items: ["Business growth fund", "Emergency reserves", "Equipment replacement", "Personal income"] }
  ];

  const pricingTips = [
    "Research local competitor rates regularly",
    "Factor in all costs including hidden overheads",
    "Consider seasonal variations in demand",
    "Build relationships to command premium rates",
    "Offer package deals for multiple services",
    "Review and adjust prices annually"
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PoundSterling className="h-5 w-5 text-elec-yellow" />
            Pricing Models for UK Electricians
          </CardTitle>
          <CardDescription>
            Choose the right pricing strategy to maximise profitability while remaining competitive
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {pricingModels.map((model, index) => (
              <Card key={index} className="bg-elec-gray/30">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{model.name}</CardTitle>
                    <Badge variant="outline">{model.ukRates}</Badge>
                  </div>
                  <CardDescription>{model.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h5 className="font-medium text-green-400 mb-2 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Advantages
                      </h5>
                      <ul className="space-y-1">
                        {model.pros.map((pro, i) => (
                          <li key={i} className="text-sm text-muted-foreground">• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-orange-400 mb-2 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        Considerations
                      </h5>
                      <ul className="space-y-1">
                        {model.cons.map((con, i) => (
                          <li key={i} className="text-sm text-muted-foreground">• {con}</li>
                        ))}
                      </ul>
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
            <Calculator className="h-5 w-5 text-elec-yellow" />
            Cost Calculation Framework
          </CardTitle>
          <CardDescription>
            Essential cost factors to include in your pricing calculations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {costFactors.map((factor, index) => (
              <Card key={index} className="bg-elec-gray/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{factor.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {factor.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
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
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            UK Market Rate Guidelines (2025)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-elec-gray/20 rounded-lg">
              <h4 className="font-medium">Domestic Work</h4>
              <p className="text-2xl font-bold text-elec-yellow">£35-50</p>
              <p className="text-sm text-muted-foreground">per hour</p>
            </div>
            <div className="p-4 bg-elec-gray/20 rounded-lg">
              <h4 className="font-medium">Commercial Work</h4>
              <p className="text-2xl font-bold text-elec-yellow">£45-65</p>
              <p className="text-sm text-muted-foreground">per hour</p>
            </div>
            <div className="p-4 bg-elec-gray/20 rounded-lg">
              <h4 className="font-medium">Emergency/Callouts</h4>
              <p className="text-2xl font-bold text-elec-yellow">£75-120</p>
              <p className="text-sm text-muted-foreground">per hour</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray/30">
        <CardHeader>
          <CardTitle className="text-lg">Pricing Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {pricingTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 shrink-0" />
                <span className="text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};